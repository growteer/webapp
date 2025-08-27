<script lang="ts">
	import { Heading } from '$lib/components/atoms';
	import { OnboardingForm } from '$lib/components/organisms';
	import type { PageData } from './$types';
	import { _ } from '$lib/services/i18n';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let { email } = data;
</script>

<div>
	<Heading type="h1">{$_('onboarding.title')}</Heading>
	<OnboardingForm
		formData={{
			firstName: '',
			lastName: '',
			dateOfBirth: new Date().toISOString(),
			primaryEmail: email,
			country: ''
		}}
	/>
</div>
