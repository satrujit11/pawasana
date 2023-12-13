<div class="background">
	<section class="container">
		<h2>SNIFFING OUT FUTURE EVENTS?</h2>

		<div class="events">
			<div></div>
			<div></div>
		</div>
	</section>
</div>

<style>
	.events {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}
	@media (width > 900px) {
		.events {
			grid-template-columns: 1fr 1fr;
		}
	}
	.events > div {
		width: 100%;
		height: 30rem;

		background-color: yellow;
	}
	h2 {
		display: block;
		text-align: center;
		color: var(--dark-50);
		font-family: var(--font-anton);
		font-size: clamp(3.5rem, 5vw, 6rem);
		line-height: 115%;
		padding-bottom: 3.5rem;
	}
	.background {
		background-color: var(--yellow);
	}

	section {
		padding-block: 4rem;
	}
</style>
