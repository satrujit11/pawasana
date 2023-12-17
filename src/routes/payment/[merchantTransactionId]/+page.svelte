<script>
	export let data;
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	onMount(() => {
		setTimeout(() => {
			goto('/');
		}, 5000);
	});
</script>

<h1>Payment Status</h1>
{#if data.data == 'PAYMENT_SUCCESS'}
	<p>Payment Successful</p>
{:else if data.data == 'PAYMENT_ERROR'}
	<p>Payment Failed</p>
{:else if data.data == 'PAYMENT_PENDING'}
	<p>Payment Pending</p>
{:else if data.data == 'PAYMENT_DECLINED'}
	<p>Payment declined by user</p>
{:else if data.data == 'PAYMENT_TIMEOUT'}
	<p>Payment Timeout</p>
{:else}
	<p>Error</p>
{/if}

<a href="/">Go Home</a>
