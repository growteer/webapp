<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';
	import { init } from '$services/authentication';
	import { onMount } from 'svelte';
	import type { IProvider } from '@web3auth/base';

	let loginWithGoogle: () => Promise<IProvider | null>;

	onMount(async () => {
		const initResult = await init();
		loginWithGoogle = initResult.loginWithGoogle;
	});
</script>

<Card class="mx-auto">
	<div class="flex flex-col space-y-6">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to Growteer</h3>
		<Button type="submit" onclick={loginWithGoogle} class="w-full">Sign in with Google</Button>
	</div>
</Card>
