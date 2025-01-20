<script lang="ts">
	interface Props {
		label: string;
		type: 'text' | 'date' | 'email';
		required?: boolean;
		value?: string;
	}

	let { label, required = false, type, value }: Props = $props();
	if (required) label += ' *';
</script>

<label class="label">
	<span class="label-text">{label}</span>
	<input class="input" {type} bind:value required />
</label>
