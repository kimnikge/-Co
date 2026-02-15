import fetch from 'node-fetch';
import crypto from 'crypto';
import type { RequestHandler } from './$types';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const CSRF_SECRET = process.env.CSRF_SECRET;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 100;

const rateLimitMap = new Map<string, number[]>();

function generateCsrfToken(): string {
	return crypto.randomBytes(32).toString('hex');
}

function verifyCsrfToken(token: string): boolean {
	if (!CSRF_SECRET) return false;
	if (token.length !== CSRF_SECRET.length) return false;
	return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(CSRF_SECRET));
}

function isRateLimited(ip: string): boolean {
	const currentTime = Date.now();
	const requestLog = rateLimitMap.get(ip) || [];

	const filteredLog = requestLog.filter((timestamp) => currentTime - timestamp < RATE_LIMIT_WINDOW);
	filteredLog.push(currentTime);
	rateLimitMap.set(ip, filteredLog);

	return filteredLog.length > RATE_LIMIT_MAX_REQUESTS;
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

	const csrfToken = request.headers.get('x-csrf-token');
	if (!csrfToken || !verifyCsrfToken(csrfToken)) {
		return new Response(JSON.stringify({ success: false, message: 'Invalid CSRF token' }), {
			status: 403,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const formData = await request.json();
	const message = `Новая заявка:\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nРежим: ${formData.regime}`;

	await sendTelegramNotification(message);

	return new Response(JSON.stringify({ success: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};