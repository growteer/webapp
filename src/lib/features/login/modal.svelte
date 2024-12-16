<script lang="ts">
	import { Button, Card } from 'flowbite-svelte';

	const initiateGoogleLogin = async () => {
		try {
			//await loginWithGoogle()
			window.location.href = '/'
		} catch (e) {
			//TODO: change to toast
			console.log(e)
		}
	}

	const initiateWalletConnectLogin = async () => {
		try {
			//await loginWithWalletConnect()
			window.location.href = '/'
		} catch (e) {
			//TODO: change to toast
			console.log(e)
		}
	}
</script>

<Card class="mx-auto">
	<div class="flex flex-col space-y-6">
		<h3 class="text-xl font-medium text-gray-900 dark:text-white">Sign in to Growteer</h3>
		<Button type="submit" onclick={initiateGoogleLogin} class="w-full">Sign in with Google</Button>
		<Button type="submit" onclick={initiateWalletConnectLogin} class="w-full">Sign in with Wallet</Button>
	</div>
</Card>
