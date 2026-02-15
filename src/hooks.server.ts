import fs from 'fs';
import path from 'path';
import type { Handle } from '@sveltejs/kit';

const LOG_FILE = path.resolve('logs/app.log');

function logEvent(event: string) {
	const timestamp = new Date().toISOString();
	const logMessage = `[${timestamp}] ${event}\n`;
	fs.appendFileSync(LOG_FILE, logMessage);
}

export const handle: Handle = async ({ event, resolve }) => {
	try {
		const response = await resolve(event);
		logEvent(`Request: ${event.url.pathname} - ${response.status}`);
		return response;
	} catch (error) {
		const message = error instanceof Error ? error.message : String(error);
		logEvent(`Error: ${message}`);
		throw error;
	}
};