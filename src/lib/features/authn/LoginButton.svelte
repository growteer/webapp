<script lang="ts">
	import { initWeb3Auth } from '$lib/services/auth/web3auth';
	import { generateNonce, login } from './mutations.gql';
	import { SolanaClient } from '$lib/services/solana/client';
	import { LogIn } from 'lucide-svelte';
	import { Navigation, type ToastContext } from '@skeletonlabs/skeleton-svelte';
	import { getContext } from 'svelte';
	import { goto } from '$app/navigation';

	export const toast: ToastContext = getContext<ToastContext>('toast');

	const handleLogin = async () => {
		const web3auth = await initWeb3Auth();

		// Open the Web3Auth Modal
		const provider = await web3auth.connect();
		if (!provider) throw new Error('login failed');

		try {
			// Get the wallet address
			const client = new SolanaClient(provider);
			const address = await client.getAddress();

			// Sign a message for verification
			const nonce = await generateNonce(address);
			const { message, signature } = await client.signLogin(nonce);

			// Verify signature through the backend and set tokens in local storage
			const loggedIn = await login(address, message, signature);
			if (!loggedIn) return goto('/signup');
		} catch (err) {
			toast.create({
				description: String(err),
				type: 'error'
			});

			await web3auth.logout();
			return goto('/');
		}

		toast.create({
			description: 'Successfully logged in',
			type: 'success'
		});

		goto('/');
	};
</script>

<Navigation.Tile id="btn-login" labelExpanded="Login" title="login" onclick={handleLogin}><LogIn /></Navigation.Tile>
