<script lang="ts">
	import { Button, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { onMount, setContext } from 'svelte';
	import { web3Auth } from '$lib/services/auth/config';
	import { initEVMAdapter } from '$lib/services/auth/evm-default';
	//import { ContextKey } from '$lib/contexts';

	interface Props {
		data: LayoutData
		children?: import('svelte').Snippet
	}

	let { data, children }: Props = $props()
	const { isAuthenticated, user } = data

	onMount(() => {
		//setContext(ContextKey.IsAuthenticated, isAuthenticated)
		//setContext(ContextKey.UserInfo, user)
	})
</script>

<Navbar>
	<NavBrand href="/">
		<img src="https://flowbite.com/docs/images/logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">GrowTeer</span>
	</NavBrand>
  <div class="flex md:order-2">
    <Button size="sm" onclick={async () => {
			await initEVMAdapter();
			await web3Auth.initModal();
			await web3Auth.connect()}}>Login</Button>
    <NavHamburger />
  </div>
	<NavUl>
		<NavLi href="/">Home</NavLi>
		{#if isAuthenticated}
			<NavLi href="/logout">Logout</NavLi>
		{:else}
			<NavLi href="/login">Login</NavLi>
		{/if}
	</NavUl>
</Navbar>

{@render children?.()}
