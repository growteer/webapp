<script lang="ts">
	import { GradientButton } from 'flowbite-svelte';
	import { getClient } from 'svelte-apollo';
	import { initWeb3Auth } from '$lib/services/auth/web3auth';
	import type { GenerateNonceMutation, LoginInput, LoginMutation, NonceInput } from '$lib/api/generated/types';
	import { GENERATE_NONCE, LOGIN } from './mutations.gql';
	import { EtherClient } from '$lib/services/ethereum/client';
	import { setSessionToken } from '$lib/storage/local';

	const gqlClient = getClient();

	//TODO: cleanup, too much stuff going on within the component
	const handleLogin = async () => {
		const web3auth = await initWeb3Auth();
		const provider = await web3auth.connect();

		if (!provider) throw new Error('login failed');

		const ethClient = new EtherClient(provider);

		const address = await ethClient.getFirstAccount();
		const nonce = await generateNonce(address);
		const message = ethClient.newLoginMessage(nonce);
		const signature = await ethClient.signLogin(address, message);

		setSessionToken(sessionToken);
		window.location.href = '/';
	};

	const generateNonce = async (address: string) => {
		const { data, errors } = await gqlClient.mutate<GenerateNonceMutation, NonceInput>({
			mutation: GENERATE_NONCE,
			variables: { address }
		});

		if (errors?.length) throw new Error(errors[0].message);
		if (!data || !data.generateNonce?.value) throw new Error('could not generate a nonce');

		return data.generateNonce.value;
	};

	const login = async (address: string, message: string, signature: string) => {
		const { data, errors } = await gqlClient.mutate<LoginMutation, LoginInput>({
			mutation: LOGIN,
			variables: { address, message, signature }
		});

		if (errors?.length) throw new Error(errors[0].message);
		if (!data || !data.login.sessionToken) throw new Error('could not log in');

		return data.login.sessionToken;
	};
</script>

<GradientButton size="sm" color="lime" onclick={handleLogin}>Login</GradientButton>
