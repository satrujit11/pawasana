<div>
	<section class="container">
		<h1>Refund</h1>
		<form method="POST">
			<input type="text" name="name" placeholder="Name" />
			<input type="email" name="email" placeholder="Email" />
			<input type="number" name="phoneNumber" placeholder="Phone Number" />
			<input type="text" name="transactionId" placeholder="Transaction ID" />
			<button type="submit">Continue</button>
		</form>
	</section>
</div>

<style>
	h1 {
		font-family: var(--font-anton);
		color: var(--dark-50);
		display: block;
		text-transform: uppercase;
		font-size: 2rem;
		text-align: center;
		padding-bottom: 2rem;
	}
	div {
		display: flex;
		flex-direction: column;
        justify-content: center;
		height: calc(100vh - 10rem);
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: min(30rem, 90vw);
	}
	input {
		width: -webkit-fill-available;
		background-color: #f5f5f5;
		padding: 1rem;
		border-radius: 1.5rem;
	}
	button {
		width: -webkit-fill-available;
		background-color: var(--pink);
		border-radius: 1.5rem;
		font-family: var(--font-anton);
		color: white;
		padding: 1rem;
		text-align: center;
	}
</style>
