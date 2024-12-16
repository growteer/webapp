import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';
import type { UserInfo } from '@web3auth/base';

export enum ContextKey {
	IsAuthenticated = 'isAuthenticated',
	UserInfo = 'userInfo'
}

export function getUserInfoContext() {
	return getContext<Writable<UserInfo>>(ContextKey.UserInfo);
}

export function getIsAuthenticatedContext() {
	return getContext<Writable<boolean>>(ContextKey.IsAuthenticated);
}
