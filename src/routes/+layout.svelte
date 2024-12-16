<script lang="ts">
	import { Button, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { onMount, setContext } from 'svelte';
	import { ContextKey } from '$lib/contexts';
	import { initWeb3Auth } from '$lib/services/auth/adapters';

	interface Props {
		data: LayoutData
		children?: import('svelte').Snippet
	}

	let { data, children }: Props = $props()
	const { isAuthenticated, user } = data

	onMount(() => {
		setContext(ContextKey.IsAuthenticated, isAuthenticated)
		setContext(ContextKey.UserInfo, user)
	})
</script>

<Navbar>
	<NavBrand href="/">
		<img src="https://flowbite.com/docs/images/logo.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">GrowTeer</span>
	</NavBrand>
  <div class="flex md:order-2">
		{#if isAuthenticated}
			<Button size="sm" onclick={async () => {
				const web3Auth = await initWeb3Auth()
				await web3Auth.logout()
				window.location.href = '/'
				}}>Logout</Button>
		{:else}
			<Button size="sm" onclick={async () => {
				const web3Auth = await initWeb3Auth()
				await web3Auth.connect()
				window.location.href = '/'
				}}>Login</Button>
		{/if}
    <NavHamburger />
  </div>
	<NavUl>
		<NavLi href="/">Home</NavLi>
	</NavUl>
</Navbar>

{@render children?.()}
