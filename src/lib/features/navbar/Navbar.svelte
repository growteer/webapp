<script>
	import { Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import { LoginButton, LogoutButton } from '$lib/features/authn/';
	import { getIsAuthenticatedContext } from '$lib/contexts';
</script>

<Navbar>
	<NavBrand href="/">
		<img src="https://flowbite.com/docs/images/logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">GrowTeer</span>
	</NavBrand>
	<div class="flex md:order-2">
		{#if getIsAuthenticatedContext()}
			<LogoutButton />
		{:else}
			<LoginButton />
		{/if}
		<NavHamburger />
	</div>
	<NavUl>
		<NavLi href="/">Home</NavLi>
	</NavUl>
</Navbar>
