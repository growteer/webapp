<script lang="ts">
	import { Heading, LoginButton } from '$lib/components/atoms';
	import { _ } from '$lib/services/i18n';
</script>

<div class="flex h-screen w-screen items-center justify-center px-4 py-8">
	<div class="mx-auto mb-32 max-w-4xl space-y-8 text-center">
		<Heading type="h2">
			{@html $_('home.title', {
				values: {
					growth: `<span class="text-tertiary-400">${$_('home.growth')}</span>`,
					connections: `<span class="text-secondary-400">${$_('home.connections')}</span>`
				}
			})}
		</Heading>

		<p class="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
			{$_('home.subtitle')}
		</p>

		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<LoginButton />
		</div>
	</div>
</div>
