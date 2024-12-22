<script>
	import { appKitModal } from '$lib/services/authentication';
	import { GradientButton } from 'flowbite-svelte';
	import AppKitEventHandler from './AppKitEventHandler.svelte';
</script>

<div>
	<GradientButton size="sm" color="lime" onclick={() => appKitModal.open()}>Login</GradientButton>
	<AppKitEventHandler />
</div>
