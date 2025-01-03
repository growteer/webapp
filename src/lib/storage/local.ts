enum StorageKey {
	SessionToken = 'gt_session'
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

export default StorageKey;
