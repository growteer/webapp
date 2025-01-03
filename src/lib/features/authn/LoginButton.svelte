<script lang="ts">
	import { GradientButton } from 'flowbite-svelte';
	import { getClient } from 'svelte-apollo';
	import { initWeb3Auth } from '$lib/services/auth/web3auth';
	import { generateNonce, login } from './mutations.gql';
	import { EtherClient } from '$lib/services/ethereum/client';
	import { setSessionToken } from '$lib/storage/local';

	const gqlClient = getClient();

	const handleLogin = async () => {
		const web3auth = await initWeb3Auth();

		// Open the Web3Auth Modal
		const provider = await web3auth.connect();
		if (!provider) throw new Error('login failed');

		// Get the Ethereum address
		const ethClient = new EtherClient(provider);
		const address = await ethClient.getFirstAccount();

		// Sign a message for verification
		const nonce = await generateNonce(gqlClient, address);
		const message = ethClient.newLoginMessage(nonce);
		const signature = await ethClient.signLogin(address, message);

		// Verify signature through the backend and get a token
		const serializedSignature = Buffer.from(signature).toString('base64');
		const sessionToken = await login(gqlClient, address, message, serializedSignature);

		setSessionToken(sessionToken);
		window.location.href = '/';
	};
</script>

<GradientButton size="sm" color="lime" onclick={handleLogin}>Login</GradientButton>
