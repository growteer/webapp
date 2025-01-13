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

<div class="grid grid-cols-[auto_1fr]">
	<aside class="card sticky top-0 col-span-1 grid h-screen">
		<Navbar />
	</aside>
	<main class="col-span-1">
		{@render children?.()}
	</main>
</div>
