<script lang="ts">
	import { GradientButton } from 'flowbite-svelte';
	import { initWeb3Auth } from '$lib/services/auth/web3auth';
	import { generateNonce, login } from './mutations.gql';
	import { SolanaClient } from '$lib/services/solana/client';
	import { setRefreshToken, setSessionToken } from '$lib/storage/local';

	const handleLogin = async () => {
		const web3auth = await initWeb3Auth();

		// Open the Web3Auth Modal
		const provider = await web3auth.connect();
		if (!provider) throw new Error('login failed');

		// Get the wallet address
		const client = new SolanaClient(provider);
		const address = await client.getAddress();

		// Sign a message for verification
		const nonce = await generateNonce(address);
		const { message, signature } = await client.signLogin(nonce);

		// Verify signature through the backend and get a token
		const { sessionToken, refreshToken } = await login(address, message, signature);

		setSessionToken(sessionToken);
		setRefreshToken(refreshToken);

		window.location.href = '/';
	};
</script>

<GradientButton size="sm" color="lime" onclick={handleLogin}>Login</GradientButton>
