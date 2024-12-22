<script lang="ts">
	import { Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { onMount, setContext } from 'svelte';
	import { setClient } from 'svelte-apollo';
	import { ContextKey } from '$lib/contexts';
	import LoginButton from '$lib/features/authn/LoginButton.svelte';
	import LogoutButton from '$lib/features/authn/LogoutButton.svelte';
	import { client } from '$lib/api/client';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	const { isAuthenticated } = data;

	setClient(client);
	setContext(ContextKey.IsAuthenticated, isAuthenticated);
</script>

<Navbar>
	<NavBrand href="/">
		<img src="https://flowbite.com/docs/images/logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">GrowTeer</span>
	</NavBrand>
	<div class="flex md:order-2">
		{#if isAuthenticated}
			<LogoutButton />
		{:else}
			<LoginButton />
		{/if}
		<NavHamburger />
	</div>
	<NavUl class="order-1">
		<NavLi href="/">Home</NavLi>
	</NavUl>
</Navbar>

{@render children?.()}
