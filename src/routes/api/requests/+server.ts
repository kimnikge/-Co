import { getStore } from '@netlify/blobs';
import crypto from 'crypto';
import type { RequestHandler } from './$types';

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

	const requests = await readRequests();
	return new Response(JSON.stringify(requests), {
		headers: { 'Content-Type': 'application/json' }
	});
};

// POST — создание заявки (из контактной формы)
export const POST: RequestHandler = async ({ request }) => {
	let data: any;
	try {
		data = await request.json();
	} catch {
		return new Response(JSON.stringify({ success: false, message: 'Invalid JSON' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

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

	const requests = await readRequests();
	requests.push(entry);
	await writeRequests(requests);

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

	let body: any;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ success: false, message: 'Invalid JSON' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const { id, status } = body;

	if (!id || !['new', 'in_progress', 'closed'].includes(status)) {
		return new Response(JSON.stringify({ success: false, message: 'invalid_data' }), {
			status: 400,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	const requests = await readRequests();
	const idx = requests.findIndex((r: any) => r.id === id);

	if (idx === -1) {
		return new Response(JSON.stringify({ success: false, message: 'not_found' }), {
			status: 404,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	requests[idx].status = status;
	await writeRequests(requests);

	return new Response(JSON.stringify({ success: true }), {
		headers: { 'Content-Type': 'application/json' }
	});
};