<script lang="ts">
	import { Navigation } from '@skeletonlabs/skeleton-svelte';
	import { Shrub } from 'lucide-svelte';
	import { LogoutButton } from '$lib/components/atoms';
	import { UserMenu } from '$lib/components/molecules';

	interface Props {
		name: string;
		title: string;
	}

	const { name, title }: Props = $props();
</script>

<Navigation.Rail
	expanded
	classes="border-r border-surface-100-900"
	widthExpanded="w-54"
	background="bg-surface 50-950"
	footerClasses="mt-auto"
	tilesJustify="justify-start"
	tilesClasses="my-2"
>
	{#snippet header()}
		<div class="flex w-full justify-start py-4">
			<Shrub class="mx-2" size="32" color="oklch(74.42% 0.15 165.81deg)" /><span class="text-2xl text-primary-500"
				>Growteer</span
			>
		</div>
		<hr class="hr border-surface-100-900" />

		<UserMenu {name} {title} />
		<hr class="hr border-surface-100-900" />
	{/snippet}
	{#snippet tiles()}
		<!--
		<Navigation.Tile id="0" expandedPadding="py-2 px-2" labelExpanded="My Company" href="/">
			<Building2 />
		</Navigation.Tile>
		-->
	{/snippet}
	{#snippet footer()}
		<LogoutButton />
	{/snippet}
</Navigation.Rail>
