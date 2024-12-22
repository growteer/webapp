<script lang="ts">
	import { GradientButton } from 'flowbite-svelte';
	import Web3 from 'web3';
	import { getClient } from 'svelte-apollo';
	import { initWeb3Auth } from '$lib/services/auth/web3auth';
	import type { GenerateNonceMutation, NonceParams } from '$lib/api/generated/types';
	import { GENERATE_NONCE } from './mutations.gql';

	const gqlClient = getClient();

	const handleLogin = async () => {
		const web3auth = await initWeb3Auth();
		const provider = await web3auth.connect();

		if (!provider) throw new Error('login failed');

		const web3 = new Web3(provider);

		const address = (await web3.eth.getAccounts())[0];
		if (!address) throw new Error("couldn't find a wallet address");

		const nonce = await generateNonce(address);

		const message = `Sign this message to login.\nNonce: ${nonce}`;
		const signature = await web3.eth.personal.sign(message, address, '');

		//TODO: verify signature through backend
		window.location.href = '/';
	};

	const generateNonce = async (address: string) => {
		const { data, errors } = await gqlClient.mutate<GenerateNonceMutation, NonceParams>({
			mutation: GENERATE_NONCE,
			variables: { address }
		});

		if (errors?.length) throw new Error(errors[0].message);
		if (!data || !data.generateNonce?.value) throw new Error('could not generate a nonce');

		return data.generateNonce.value;
	};
</script>

<GradientButton size="sm" color="lime" onclick={handleLogin}>Login</GradientButton>
