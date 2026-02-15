import fetch from 'node-fetch';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import type { RequestHandler } from './$types';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 100;
const DATA_FILE = path.resolve('data/requests.json');

const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
	const currentTime = Date.now();
	const requestLog = rateLimitMap.get(ip) || [];
	const filteredLog = requestLog.filter((timestamp) => currentTime - timestamp < RATE_LIMIT_WINDOW);
	filteredLog.push(currentTime);
	rateLimitMap.set(ip, filteredLog);
	return filteredLog.length > RATE_LIMIT_MAX_REQUESTS;
}

function readRequests(): any[] {
	try {
		return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
	} catch {
		return [];
	}
}

function writeRequests(data: any[]) {
	fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

async function sendTelegramNotification(message: string): Promise<void> {
	if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
	const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
	await fetch(url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
	});
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	const forwarded = request.headers.get('x-forwarded-for');
	const ip = forwarded?.split(',')[0].trim() || getClientAddress();

	if (isRateLimited(ip)) {
		return new Response(JSON.stringify({ success: false, message: 'Rate limit exceeded' }), {
			status: 429,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const formData = await request.json();

	// Валидация
	if (!formData.name || !formData.phone || !formData.regime || !formData.consent) {
		return new Response(JSON.stringify({ success: false, message: 'validation_error' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Сохраняем заявку в JSON
	const entry = {
		id: crypto.randomUUID(),
		date: new Date().toISOString(),
		name: formData.name,
		phone: formData.phone,
		businessType: formData.businessType || '',
		regime: formData.regime,
		status: 'new'
	};

	const requests = readRequests();
	requests.push(entry);
	writeRequests(requests);

	// Telegram уведомление
	const message = `📩 Новая заявка:\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nТип: ${formData.businessType || '—'}\nРежим: ${formData.regime}`;
	await sendTelegramNotification(message);

	return new Response(JSON.stringify({ success: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};