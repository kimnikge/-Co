import { json2csv } from 'json-2-csv';
import { getStore } from '@netlify/blobs';
import type { RequestHandler } from './$types';

function isAuthorized(cookies: any): boolean {
	const session = cookies.get('admin_session');
	const secret = process.env.SESSION_SECRET || 'default-secret';
	return session === secret;
}

export const GET: RequestHandler = async ({ cookies }) => {
	if (!isAuthorized(cookies)) {
		return new Response('Unauthorized', { status: 401 });
	}

	let data: any[] = [];
	try {
		const store = getStore({ name: 'requests', consistency: 'strong' });
		const result = await store.get('requests', { type: 'json' });
		data = (result as any[]) || [];
	} catch { /* empty */ }

	if (data.length === 0) {
		return new Response('id,date,name,phone,businessType,regime,status', {
			headers: {
				'Content-Type': 'text/csv',
				'Content-Disposition': 'attachment; filename="requests.csv"'
			}
		});
	}

	const csv = await json2csv(data);

	return new Response(csv, {
		headers: {
			'Content-Type': 'text/csv',
			'Content-Disposition': 'attachment; filename="requests.csv"'
		}
	});
};