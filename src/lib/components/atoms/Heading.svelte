<script lang="ts">
	interface Props {
		type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		children?: import('svelte').Snippet;
	}

	let { type, children }: Props = $props();
	let bottomMargin = $derived.by(() => {
		switch (type) {
			case 'h1':
				return 'mb-8';
			case 'h2':
				return 'mb-6';
			case 'h3':
				return 'mb-4';
			default:
				return 'mb-2';
		}
	});
</script>

<svelte:element this={type} class="{type} {bottomMargin}">
	{@render children?.()}
</svelte:element>
