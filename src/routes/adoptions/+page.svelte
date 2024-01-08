<script>
	import AdoptionList from '../admin/adoptions/AdoptionList.svelte';
</script>

<div class="header-background">
	<header class="container">
		<div class="header-image">
			<img
				src="https://pawasana-dev.s3.ap-south-1.amazonaws.com/assets/adoption-header1.png"
				alt="CuteDog"
				loading="eager"
			/>
		</div>

		<div>
			<h1>
				CHOOSE RIGHT <div>CHOOSE ADOPTION</div>
			</h1>
		</div>
	</header>
</div>
<section class="container adoption-list">
	<h2>PAWRENTS WANTED</h2>
	<AdoptionList />
</section>

<div class="reason-background">
	<section class="adoption-reason container">
		<h2>WHY CHOOSE ADOPTION ?</h2>
		<div>
			<p>
				Many breeders treat animals unethically for profit. Animals are often mistreated in the
				breeding industry. Many dogs live in overcrowded, unclean kennels without sufficient care,
				socializing, or veterinary care. This environment impacts these creature’s physical, mental,
				and emotional health. Such breeding practices push animals into shelters. Negligent breeding
				causes many of these creatures to be abandoned, surrendered, or saved. The number of animals
				in need of homes, care, and affection overwhelms shelters.
			</p>

			<p>
				By opening your heart and home to these deserving animals, you're not only providing them
				with a second chance, but also creating a bond that will bring immeasurable happiness to
				both of your lives. Discover the heartwarming opportunity to transform the life of a
				precious paw companion. Within the walls of shelters, countless dogs yearn for the warmth of
				a loving home, adoption not only chances their lives it changes your too.
			</p>
		</div>
	</section>
</div>

<style>
	.header-image {
		width: 100%;
		height: clamp(25rem, 80vw + 6rem, 50rem);
	}
	.adoption-reason {
		padding-block: clamp(5rem, 8vw, 10rem);
	}
	.reason-background {
		background-color: var(--pink);
	}
	.adoption-reason > div {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 2rem;
	}

	@media (width < 600px) {
		.adoption-reason > div {
			grid-template-columns: 1fr;
		}
		.adoption-reason p {
			text-align: center;
		}
	}
	.adoption-reason p {
		color: white;
		font-size: 1.5rem;
		font-weight: 500;
		line-height: 115%;
	}
	.adoption-reason > h2 {
		display: block;
		text-align: center;
		font-size: clamp(3.5rem, 5vw, 6rem);
		font-family: var(--font-anton);
		line-height: 115%;
		color: white;
		padding-bottom: 3rem;
	}
	header > div {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: relative;
	}
	h1 {
		text-align: center;
		display: block;
		font-size: clamp(2rem, 5vw, 7rem);
		font-family: var(--font-anton);
		line-height: 150%;
		color: white;
		position: absolute;
		bottom: 2rem;
	}
	@media (width < 600px) {
		h1 {
			position: static;
		}
		.header-background {
			padding-block: 6rem 2rem;
		}
	}
	h1 > div {
		font-size: clamp(3rem, 12vw, 12rem);
		line-height: 100%;
	}
	.header-background {
		background-color: var(--yellow);
    overflow: hidden;
	}
	.adoption-list > h2 {
		display: block;
		text-align: center;
		font-size: clamp(3.5rem, 5vw, 6rem);
		font-family: var(--font-anton);
		line-height: 115%;
		color: var(--pink);
		padding-bottom: 3rem;
	}
	.adoption-list {
		padding-block: 3rem 4.5rem;
	}
</style>
