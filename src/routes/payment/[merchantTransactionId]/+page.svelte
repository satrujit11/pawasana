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
	{#if data.data == 'PAYMENT_SUCCESS'}
		<h1 class="success">Payment Successful</h1>
		<PaymentReceived />
	{:else}
		<div class="box">
			<h1 class="error">Error in receiving payment</h1>
			<span
				>There is some error fetching the payment status. If the money is deducted from your
				account, in 24-48 hours it will be refunded.</span
			>
		</div>
	{/if}
	<p class="redirect">Redirecting to home page in {seconds} seconds...</p>
	<a href="/">Go Home</a>
</section>

<style>
	.success {
		color: green;
	}

    section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
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
	.box {
		display: flex;
		flex-direction: column;
	}

	.error {
		color: red;
		font-size: 2rem;
	}
	.redirect {
		padding-bottom: 2rem;
	}
</style>
