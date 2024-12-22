<script lang="ts">
	import type { GenerateNonceMutation, NonceParams } from '$lib/api/generated/types';
	import { appKitModal, wagmiAdapter } from '$lib/services/authentication';
	import { getAccount, signMessage } from '@wagmi/core';
	import { onMount } from 'svelte';
	import { mutation } from 'svelte-apollo';
	import { GENERATE_NONCE } from './queries';

	onMount(() => {
		const unsubscribe = appKitModal.subscribeEvents(async (event) => {
			switch (event.data.event) {
				case 'SOCIAL_LOGIN_SUCCESS':
					await handleLogin();
					break;
				case 'CONNECT_SUCCESS':
					await handleLogin();
					break;
				case 'SWITCH_NETWORK':
					await handleLogout();
					await handleLogin();
					break;
				case 'DISCONNECT_SUCCESS':
					await handleLogout();
					break;
				default:
					break;
			}
		});

		return unsubscribe;
	});

	const handleLogin = async () => {
		console.log('HANDLING LOGIN');
		const account = getAccount(wagmiAdapter.wagmiConfig);
		if (!account?.address) throw new Error("couldn't find a wallet address");

		const nonce = await generateNonce(account.address);

		const message = `Sign this message to login.\nNonce: ${nonce}`;
		const signature = await signMessage(wagmiAdapter.wagmiConfig, { message });

		//TODO: verify signature through backend
		window.location.href = '/';
	};

	const handleLogout = async () => {
		console.log('HANDLING LOGOUT');
		//TODO: clear sessiosn
		window.location.href = '/';
	};

	const generateNonce = async (address: string) => {
		const req = mutation<GenerateNonceMutation, NonceParams>(GENERATE_NONCE);

		const res = await req({ variables: { address } });

		if (res.errors?.length) throw new Error(res.errors[0].message);
		if (!res.data?.generateNonce?.value) throw new Error('could not generate a nonce');

		return res.data.generateNonce.value;
	};
</script>
