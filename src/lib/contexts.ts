import { getContext, setContext } from 'svelte';
import { writable, type Writable } from 'svelte/store';

export enum ContextKey {
	IsAuthenticated = 'isAuthenticated'
}

export function getIsAuthenticatedContext() {
	return getContext<Writable<boolean>>(ContextKey.IsAuthenticated);
}

export function setIsAuthenticatedContext(isAuthenticated: boolean) {
	return setContext<Writable<boolean>>(ContextKey.IsAuthenticated, writable(isAuthenticated));
}
