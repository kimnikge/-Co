import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const session = cookies.get('admin_session');
	const secret = process.env.SESSION_SECRET || 'default-secret';
	const isAuth = session === secret;

	return { isAuth };
};