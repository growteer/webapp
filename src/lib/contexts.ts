import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';
import type { UserInfo } from '@web3auth/base';

export enum ContextKey {
	IsAuthenticated = 'isAuthenticated',
	UserInfo = 'userInfo'
}

export function getUserInfoContext() {
	return getContext<Writable<Partial<UserInfo>>>(ContextKey.UserInfo);
}

export function setUserInfoContext(userInfo?: Partial<UserInfo>) {
	return setContext<Writable<Partial<UserInfo> | undefined>>(ContextKey.UserInfo, writable(userInfo));
}

export function getIsAuthenticatedContext() {
	return getContext<Writable<boolean>>(ContextKey.IsAuthenticated);
}

export function setIsAuthenticatedContext(isAuthenticated: boolean) {
	return setContext<Writable<boolean>>(ContextKey.IsAuthenticated, writable(isAuthenticated));
}
