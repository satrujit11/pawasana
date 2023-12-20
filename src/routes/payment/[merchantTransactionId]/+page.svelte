<script>
	export let data;
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import PaymentReceived from '$lib/components/PaymentReceived.svelte';

	let seconds = 3;

	onMount(() => {
		const timer = setInterval(() => {
			seconds--;
			if (seconds <= 0) {
				clearInterval(timer);
				goto('/');
			}
		}, 1000);
	});
</script>

<section class="container">
	<h1>Payment Status</h1>

	{#if data.data == 'PAYMENT_SUCCESS'}
		<p>Payment Successful</p>
		<PaymentReceived />
	{:else if data.data == 'PAYMENT_ERROR'}
		<p>Payment Failed</p>
	{:else if data.data == 'PAYMENT_PENDING'}
		<p>Payment Pending</p>
	{:else if data.data == 'PAYMENT_DECLINED'}
		<p>Payment declined by user</p>
	{:else if data.data == 'PAYMENT_TIMEOUT'}
		<p>Payment Timeout</p>
	{:else}
		<div class="box">
			<p class="error">Error in payment</p>
		</div>
	{/if}

	<p class="redirect">Redirecting to home page in {seconds} seconds...</p>
	<a href="/">Go Home</a>
</section>

<style>
	h1 {
		text-align: center;
		display: block;
		padding: 1rem;
		font-family: var(--font-anton);
		font-size: 3rem;
		color: var(--pink);
	}
	p {
		display: block;
		text-align: center;
		font-size: 1rem;
	}
	a {
		display: block;
		text-align: center;
		font-size: 1rem;
		color: var(--pink);
		text-decoration: underline;
		text-underline-offset: 0.5rem;
		font-weight: 500;
	}
    .box{
        display: flex;
        flex-direction: column;
    }

    .error{
        color: red;
        font-size: 2rem;
    }
    .redirect {
        padding-bottom: 2rem;
    }
</style>
