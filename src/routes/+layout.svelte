<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import { setIsAuthenticatedContext, setUserInfoContext } from '$lib/contexts';
	import { Navbar } from '$lib/features/navbar/';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	const { isAuthenticated, user } = data;

	setIsAuthenticatedContext(isAuthenticated);
	setUserInfoContext(user);
</script>

<Navbar></Navbar>

{@render children?.()}
