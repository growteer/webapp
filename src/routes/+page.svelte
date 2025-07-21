<script lang="ts">
	import { Heading, LoginButton } from '$lib/components/atoms';
</script>

<div class="flex min-h-screen items-center justify-center px-4 py-8">
	<div class="mx-auto mb-32 max-w-4xl space-y-8 text-center">
		<Heading type="h2">
			The place where <span class="text-tertiary-400">growth</span> happens on your own terms and
			<span class="text-secondary-400">connections</span> turn into opportunities.
		</Heading>

		<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
			<LoginButton />
		</div>
	</div>
</div>
