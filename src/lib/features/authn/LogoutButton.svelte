<script>
	import { appKitModal } from '$lib/services/authentication';
	import { GradientButton } from 'flowbite-svelte';

	const handleLogout = async () => {
		await appKitModal.disconnect();
		window.location.href = '/';
	};
</script>

<GradientButton size="sm" outline color="lime" onclick={() => handleLogout()}>Logout</GradientButton>
