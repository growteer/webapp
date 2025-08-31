<script lang="ts">
	import { onMount, createEventDispatcher } from 'svelte';
	import { _ } from 'svelte-i18n';
	import { errorService, type AppError, ErrorSeverity } from '../../services/error';
	import { Button } from '@skeletonlabs/skeleton-svelte';

	interface Props {
		/** The error to display */
		error?: AppError;
		/** Whether to show the full error boundary UI */
		showFallback?: boolean;
		/** Custom fallback message */
		fallbackMessage?: string;
		/** Whether to show recovery actions */
		showRecoveryActions?: boolean;
	}

	let { error, showFallback = false, fallbackMessage, showRecoveryActions = true }: Props = $props();

	const dispatch = createEventDispatcher<{
		recover: { action: string };
		retry: void;
	}>();

	// Get recovery actions for the error
	$: recoveryActions = error ? errorService.getRecoveryActions(error) : [];

	// Determine if we should show the fallback UI
	$: shouldShowFallback = showFallback || error?.severity === ErrorSeverity.CRITICAL;

	// Get display message
	$: displayMessage = fallbackMessage || error?.message || $_('errors.system.unknown_error');

	const handleRecoveryAction = (action: string) => {
		switch (action) {
			case 'retry':
				dispatch('retry');
				break;
			case 'refresh':
				window.location.reload();
				break;
			case 'navigate_home':
				window.location.href = '/';
				break;
			case 'contact_support':
				// TODO: Open support contact modal or navigate to support page
				console.log('Contact support requested');
				break;
			case 'check_network':
				// TODO: Show network troubleshooting tips
				console.log('Network check requested');
				break;
			case 'update_browser':
				// TODO: Show browser update instructions
				console.log('Browser update requested');
				break;
			case 'clear_cache':
				// Clear application cache
				if ('caches' in window) {
					caches.keys().then((names) => {
						names.forEach((name) => caches.delete(name));
					});
				}
				localStorage.clear();
				sessionStorage.clear();
				window.location.reload();
				break;
			default:
				dispatch('recover', { action });
		}
	};
</script>

{#if shouldShowFallback && error}
	<div class="error-boundary bg-surface-100-800-token rounded-lg border border-error-500 p-6 text-center">
		<div class="mb-4">
			<h2 class="mb-2 h2 text-error-500">
				{$_('common.error')}
			</h2>
			<p class="text-surface-600-300-token">
				{displayMessage}
			</p>
		</div>

		{#if showRecoveryActions && recoveryActions.length > 0}
			<div class="flex flex-wrap justify-center gap-2">
				{#each recoveryActions as action}
					<Button variant="outline-error" size="sm" onclick={() => handleRecoveryAction(action)}>
						{$_(`recovery.${action}`)}
					</Button>
				{/each}
			</div>
		{/if}

		{#if error.context?.source}
			<details class="text-surface-500-400-token mt-4 text-sm">
				<summary class="cursor-pointer">Error Details</summary>
				<div class="mt-2 text-left">
					<p><strong>Source:</strong> {error.context.source}</p>
					{#if error.context.operation}
						<p><strong>Operation:</strong> {error.context.operation}</p>
					{/if}
					<p><strong>Type:</strong> {error.type}</p>
					<p><strong>Domain:</strong> {error.domain}</p>
					{#if error.context.timestamp}
						<p><strong>Time:</strong> {error.context.timestamp.toLocaleString()}</p>
					{/if}
				</div>
			</details>
		{/if}
	</div>
{:else if error && !shouldShowFallback}
	<!-- Non-critical errors just show as inline messages -->
	<div class="error-message rounded border border-warning-300 bg-warning-100 p-3 text-sm text-warning-700">
		{displayMessage}

		{#if showRecoveryActions && recoveryActions.length > 0}
			<div class="mt-2 flex gap-2">
				{#each recoveryActions as action}
					<button class="text-xs underline hover:no-underline" onclick={() => handleRecoveryAction(action)}>
						{$_(`recovery.${action}`)}
					</button>
				{/each}
			</div>
		{/if}
	</div>
{/if}
