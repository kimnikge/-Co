import type { RequestHandler } from './$types';

const loginAttempts = new Map<string, number[]>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;

function isLoginRateLimited(ip: string): boolean {
	const now = Date.now();
	const attempts = (loginAttempts.get(ip) || []).filter(t => now - t < WINDOW_MS);
	loginAttempts.set(ip, attempts);
	return attempts.length >= MAX_ATTEMPTS;
}

function recordLoginAttempt(ip: string) {
	const attempts = loginAttempts.get(ip) || [];
	attempts.push(Date.now());
	loginAttempts.set(ip, attempts);
}

export const POST: RequestHandler = async ({ request, cookies, getClientAddress }) => {
	const forwarded = request.headers.get('x-forwarded-for');
	const ip = forwarded?.split(',')[0].trim() || getClientAddress();

	let body: any;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { action, login, password } = body;

	// Логаут
	if (action === 'logout') {
		cookies.delete('admin_session', { path: '/' });
		return new Response(JSON.stringify({ success: true }), {
			headers: { 'Content-Type': 'application/json' }
		});
	}

	// Логин
	if (action === 'login') {
		if (isLoginRateLimited(ip)) {
			return new Response(JSON.stringify({ success: false, message: 'Слишком много попыток. Попробуйте позже.' }), {
				status: 429,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const adminLogin = process.env.ADMIN_LOGIN || 'admin';
		const adminPassword = process.env.ADMIN_PASSWORD || 'admin';
		const sessionSecret = process.env.SESSION_SECRET || 'default-secret';

		recordLoginAttempt(ip);

		if (login === adminLogin && password === adminPassword) {
			cookies.set('admin_session', sessionSecret, {
				path: '/',
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				sameSite: 'strict',
				maxAge: 60 * 60 * 8 // 8 часов
			});
			return new Response(JSON.stringify({ success: true }), {
				headers: { 'Content-Type': 'application/json' }
			});
		}

		return new Response(JSON.stringify({ success: false, message: 'Неверный логин или пароль' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	return new Response(JSON.stringify({ error: 'Unknown action' }), {
		status: 400,
		headers: { 'Content-Type': 'application/json' }
	});
};
