<script lang="ts">
	import type { PageData } from './$types';
	import { createStream } from '$lib/services/ceramic/create_stream';

	interface Props {
		data: PageData;
		children?: import('svelte').Snippet;
	}

	let { data }: Props = $props();
	const { isAuthenticated, user } = data;
	let profileStreamID = $state(localStorage.getItem('profileStreamID'));
	let streamIsCreating = $state(false);
	let nameFromStream = '';
	let emailFromStream = '';
	let avatarFromStream = '';

	async function initStream() {
		streamIsCreating = true;
		const { streamID, content } = await createStream({ name: user.name, email: user.email, avatar: user.profileImage });
		if (!streamID) {
			console.log('no stream was created');
			return;
		}

		console.log('content:', content);

		nameFromStream = content?.name ?? 'n/a';
		emailFromStream = content?.email ?? 'n/a';
		avatarFromStream = content?.avatar ?? '';

		profileStreamID = streamID.toString();
		streamIsCreating = false;
	}
</script>

<div class="p-4">
	<h1 class="h1">Welcome to Growteer!</h1>
	{#if isAuthenticated}
		<p>Hello, {user.name}</p>
	{/if}
	{#if !profileStreamID}
		<button type="button" disabled={streamIsCreating} onclick={initStream} class="btn preset-filled-primary-500"
			>Create Profile Stream</button
		>
	{:else}
		<p>Name: {nameFromStream}</p>
		<p>Email: {emailFromStream}</p>
		<img alt="avatar" src={avatarFromStream} />
	{/if}
</div>
