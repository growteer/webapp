<script>
	import { appKitModal } from '$lib/services/authentication';
	import { GradientButton } from 'flowbite-svelte';
	import AppKitEventHandler from './AppKitEventHandler.svelte';
</script>

<div>
	<GradientButton size="sm" outline color="lime" onclick={() => appKitModal.disconnect()}>Logout</GradientButton>
	<AppKitEventHandler />
</div>
