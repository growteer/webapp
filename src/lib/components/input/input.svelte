<script lang="ts">
	interface Props {
		label: string;
		type: 'text' | 'date' | 'email' | 'textarea';
		required?: boolean;
		value?: string | number | Date;
	}

	let { label, required = false, type, value = $bindable() }: Props = $props();
	if (required) label += ' *';
</script>

<label class="label">
	<span class="label-text">{label}</span>
	{#if type === 'textarea'}
		<textarea class="textarea" rows="4" bind:value {required}></textarea>
	{:else}
		<input class="input" {type} bind:value {required} />
	{/if}
</label>
