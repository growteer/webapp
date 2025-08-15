<script lang="ts">
	import '../app.css';
	import { Navbar } from '$lib/components/organisms';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<aside class="sticky top-0 col-span-1 grid h-screen card">
	<Navbar />
</aside>
<main class="col-span-1 px-8 py-2">
	{@render children?.()}
</main>
