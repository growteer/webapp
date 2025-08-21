<script lang="ts">
	import { Navbar } from '$lib/components/organisms';
	import type { LayoutData } from './$types';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { children, data }: Props = $props();
	const { name, title } = data;
</script>

<aside class="sticky top-0 col-span-1 grid h-screen card">
	<Navbar {name} {title} />
</aside>
<main class="col-span-1 px-8 py-2">
	{@render children?.()}
</main>
