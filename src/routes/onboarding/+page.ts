import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { isAuthenticated, user } = await parent();
	if (!isAuthenticated) {
		redirect(302, '/');
	}

	const nameParts = user?.name?.split(' ');
	if (!nameParts) return { firstName: '', lastName: '' };

	const lastName = nameParts.pop() ?? '';
	const firstName = nameParts.join(' ') ?? '';

	return { firstName, lastName };
};
