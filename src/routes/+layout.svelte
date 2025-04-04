<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import { Toaster } from '@skeletonlabs/skeleton-svelte';
	import { Navbar } from '$lib/features/navbar/';
	import { setIsAuthenticatedContext, setUserInfoContext } from '$lib/contexts';
	import { getToaster } from '$lib/features/toast';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	const { isAuthenticated, user } = data;

	setIsAuthenticatedContext(isAuthenticated);
	setUserInfoContext(user);

	const toaster = getToaster();
</script>

<Toaster {toaster}></Toaster>
<div class="grid grid-cols-[auto_1fr]">
	<aside class="card sticky top-0 col-span-1 grid h-screen">
		<Navbar />
	</aside>
	<main class="col-span-1 px-8 py-2">
		{@render children?.()}
	</main>
</div>
