<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';
	import { Toaster } from '@skeletonlabs/skeleton-svelte';
	import { getToaster } from '$lib/services/toast';
	import { setIsAuthenticatedContext } from '$lib/contexts';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	const { isAuthenticated = false } = data;

	setIsAuthenticatedContext(isAuthenticated);

	const toaster = getToaster();
</script>

<Toaster {toaster}></Toaster>
<div class="grid grid-cols-[auto_1fr] bg-white text-gray-800">
	{@render children?.()}
</div>
