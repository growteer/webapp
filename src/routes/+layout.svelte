<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import { setClient } from 'svelte-apollo';
	import { setIsAuthenticatedContext, setUserInfoContext } from '$lib/contexts';
	import { Navbar } from '$lib/features/navbar/';
	import { client } from '$lib/api/client';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	const { isAuthenticated, user } = data;

	setIsAuthenticatedContext(isAuthenticated);
	setUserInfoContext(user);
	setClient(client);
</script>

<Navbar></Navbar>

{@render children?.()}
