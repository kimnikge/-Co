import { getStore } from '@netlify/blobs';
import crypto from 'crypto';
import type { RequestHandler } from './$types';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 100;

const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
	const currentTime = Date.now();
	const requestLog = rateLimitMap.get(ip) || [];
	const filteredLog = requestLog.filter((timestamp) => currentTime - timestamp < RATE_LIMIT_WINDOW);
	filteredLog.push(currentTime);
	rateLimitMap.set(ip, filteredLog);
	return filteredLog.length > RATE_LIMIT_MAX_REQUESTS;
}

async function readRequests(): Promise<any[]> {
	try {
		const store = getStore({ name: 'requests', consistency: 'strong' });
		const data = await store.get('requests', { type: 'json' });
		return (data as any[]) || [];
	} catch {
		return [];
	}
}

async function writeRequests(data: any[]) {
	const store = getStore({ name: 'requests', consistency: 'strong' });
	await store.setJSON('requests', data);
}

async function sendTelegramNotification(message: string): Promise<void> {
	if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;
	try {
		const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
		await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text: message })
		});
	} catch {
		// Игнорируем ошибки уведомлений
	}
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

	let formData: any;
	try {
		formData = await request.json();
	} catch {
		return new Response(JSON.stringify({ success: false, message: 'Invalid JSON' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Валидация
	if (!formData.name || !formData.phone || !formData.regime || !formData.consent) {
		return new Response(JSON.stringify({ success: false, message: 'validation_error' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Сохраняем заявку в Netlify Blobs
	const entry = {
		id: crypto.randomUUID(),
		date: new Date().toISOString(),
		name: formData.name,
		phone: formData.phone,
		businessType: formData.businessType || '',
		regime: formData.regime,
		status: 'new'
	};

	const requests = await readRequests();
	requests.push(entry);
	await writeRequests(requests);

	// Telegram уведомление
	const message = `📩 Новая заявка:\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nТип: ${formData.businessType || '—'}\nРежим: ${formData.regime}`;
	await sendTelegramNotification(message);

	return new Response(JSON.stringify({ success: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};