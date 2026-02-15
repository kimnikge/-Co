import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import type { RequestHandler } from './$types';

const DATA_FILE = path.resolve('data/requests.json');

function readRequests(): any[] {
	try {
		const raw = fs.readFileSync(DATA_FILE, 'utf-8');
		return JSON.parse(raw);
	} catch {
		return [];
	}
}

function writeRequests(data: any[]) {
	fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

function isAuthorized(cookies: any): boolean {
	const session = cookies.get('admin_session');
	const secret = process.env.SESSION_SECRET || 'default-secret';
	return session === secret;
}

// GET — список заявок (только авторизованным)
export const GET: RequestHandler = async ({ cookies }) => {
	if (!isAuthorized(cookies)) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const requests = readRequests();
	return new Response(JSON.stringify(requests), {
		headers: { 'Content-Type': 'application/json' }
	});
};

// POST — создание заявки (из контактной формы)
export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();

	if (!data.name || !data.phone || !data.regime) {
		return new Response(JSON.stringify({ success: false, message: 'validation_error' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const entry = {
		id: crypto.randomUUID(),
		date: new Date().toISOString(),
		name: data.name,
		phone: data.phone,
		businessType: data.businessType || '',
		regime: data.regime,
		status: 'new'
	};

	const requests = readRequests();
	requests.push(entry);
	writeRequests(requests);

	return new Response(JSON.stringify({ success: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};

// PATCH — изменение статуса заявки
export const PATCH: RequestHandler = async ({ request, cookies }) => {
	if (!isAuthorized(cookies)) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { id, status } = await request.json();

	if (!id || !['new', 'in_progress', 'closed'].includes(status)) {
		return new Response(JSON.stringify({ success: false, message: 'invalid_data' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const requests = readRequests();
	const idx = requests.findIndex((r: any) => r.id === id);

	if (idx === -1) {
		return new Response(JSON.stringify({ success: false, message: 'not_found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	requests[idx].status = status;
	writeRequests(requests);

	return new Response(JSON.stringify({ success: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};