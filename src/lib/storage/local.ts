enum StorageKey {
	SessionToken = 'gt_session',
	RefreshToken = 'gt_refresh'
}

export const setSessionToken = (token: string) => {
	localStorage.setItem(StorageKey.SessionToken, token);
};

export const getSessionToken = () => {
	return localStorage.getItem(StorageKey.SessionToken);
};

export const removeSessionToken = () => {
	localStorage.removeItem(StorageKey.SessionToken);
};

export const setRefreshToken = (token: string) => {
	localStorage.setItem(StorageKey.RefreshToken, token);
};

export const getRefreshToken = () => {
	return localStorage.getItem(StorageKey.RefreshToken);
};

export const removeRefreshToken = () => {
	localStorage.removeItem(StorageKey.RefreshToken);
};

export default StorageKey;
