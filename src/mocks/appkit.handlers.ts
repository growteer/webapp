import { http, HttpResponse } from 'msw';

export const appkitHandlers = [
	http.post('https://pulse.walletconnect.org/e', () => {
		return HttpResponse.json({}, { status: 202 });
	}),
	http.get('https://api.web3modal.org/appkit/v1/config', () => {
		return HttpResponse.json({}, { status: 200 });
	})
];
