<script>
	import { goto } from '$app/navigation';
	import { generateNonce } from '$lib/api/nonces';
	import { ContextKey } from '$lib/contexts';
	import { appKitModal, wagmiAdapter } from '$lib/services/authentication';
	import { getAccount, signMessage } from '@wagmi/core';
	import { GradientButton } from 'flowbite-svelte';
	import { setContext } from 'svelte';

	appKitModal.subscribeEvents(async (event) => {
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

	const handleLogin = async () => {
		const account = getAccount(wagmiAdapter.wagmiConfig);
		if (!account?.address) throw new Error("couldn't find a wallet address");

		const nonce = await generateNonce(account.address);

		const message = `Sign this message to login.\nNonce: ${nonce}`;
		const signature = await signMessage(wagmiAdapter.wagmiConfig, { message });

		//TODO: verify signature through backend
		window.location.href = '/';
	};

	const handleLogout = async () => {
		//TODO: Also doesn't really make sense here in the LoginButton component
		window.location.href = '/';
	};
</script>

<GradientButton size="sm" color="lime" onclick={() => appKitModal.open()}>Login</GradientButton>
