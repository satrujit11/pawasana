<script>
	export let data;
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
{:else}
	<p>Payment Timeout</p>
{/if}


<a href="/">Go Home</a>
