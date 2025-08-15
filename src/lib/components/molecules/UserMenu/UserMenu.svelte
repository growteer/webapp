<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton-svelte';

	interface Props {
		name: string;
		title: string;
	}

	let { name, title }: Props = $props();
</script>

<a href="/profile" class="mx-2 my-2 grid grid-cols-5 items-center gap-x-3">
	<Avatar classes="col-span-1" src="" {name} background="preset-tonal-secondary" size="size-8" />
	<div class="col-span-4 flex flex-col gap-y-0">
		<span class="text-sm font-semibold">{name}</span>
		<span class="text-muted-foreground text-xs">{title}</span>
	</div>
</a>
