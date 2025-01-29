import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { isAuthenticated, user } = await parent();
	if (!isAuthenticated) {
		redirect(302, '/');
	}

	const nameParts = user?.name?.split(' ');
	if (!nameParts) return { firstname: '', lastname: '' };

	const lastname = nameParts.pop() ?? '';
	const firstname = nameParts.join(' ') ?? '';

	return { firstname, lastname };
};
