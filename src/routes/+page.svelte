<script>
	import Achivements from '$lib/components/Achivements.svelte';
	import AdoptionList from '../lib/components/AdoptionList.svelte';
	import FutureEvent from './FutureEvent.svelte';
</script>

<header>
	<div class="banner">
	</div>
</header>
<div class="blank-space">
		<div class="container">
			<hgroup class="container">
				<h2>A CAUSE-LED EXPERIENCE IN INDIA</h2>
				<h1>PAWASANA</h1>
			</hgroup>
		</div>
</div>
<FutureEvent />

<section class="impact container">
	<article>
		<h2>PAWSITIVE IMPACT BY PAWASANA AND OUR INDIES.</h2>
		<p>
			Pawasana has assisted around 30+ adoptions across different parts of India within a
			period of less than a year. When you buy a ticket for our workshop, a portion of the
			proceeds are donated to the participating NGO or organisation. A wallet is also
			maintained through our workshops to pay for medical bills for rescues, vaccination
			drives, and food for rescues. Help us change the world one ticket at a time by joining
			us!
		</p>
		<a href="/adoptions">CHOOSE ADOPTION</a>
	</article>
	<div class="datas">
		<div>
			<div><h2><strong class="white-text">10</strong>CITIES</h2></div>
			<div><h2><strong>150+</strong>HAPPY SMILES</h2></div>
		</div>
	</div>
</section>

<div class="pawrents">
	<section>
		<article class="container">
			<h2>PAWRENTS WANTED</h2>
			<p class="semi-container">
				When you make the compassionate choice to rescue a dog, you are extending a lifeline
				to a precious furry companion who is longing for a fresh start. By opening your
				heart and home, you are not only granting them a safe haven, but also a future
				brimming with joyous tail wags and boundless affection.
			</p>
		</article>

        <AdoptionList />
		<a href="/adoptions">MORE FUR BABIES</a>
	</section>
</div>

<section class="impact container">
	<div class="datas dog-images">
		<img src="../assets/home_dog.png" alt="A cute dog looking at you." loading="lazy" />
	</div>
	<article>
		<h2>MEET OUR TEAM AND DIG INTO OUR DOGGO JOURNEY</h2>
		<p>
			A cause-led experience for Indies in India was introduced for the first time to educate
			about adoptions and create awareness through our workshops. The vision is to create
			India a better place for our Indie dogs/cats and to break the stigma of buying dogs and
			choose to <strong>#adoptdontshop</strong>.
		</p>
		<a href="/about">MORE ABOUT US</a>
	</article>
</section>

<Achivements />

<style>
	.pawrents a:hover {
		background-color: white !important;
		color: var(--pink) !important;
	}
	.white-text {
		color: white !important;
	}
	.datas > img {
		width: 70%;
	}
	.impact strong {
		font-weight: medium;
		color: var(--dark-50);
	}
	.dog-images {
		justify-content: flex-start !important;
	}
	@media (width <800px) {
		.datas > img {
			width: 60%;
		}
		.dog-images {
			display: flex !important;
			justify-content: center !important;
		}
	}
	.pawrents > section {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.pawrents a {
		color: white !important;
		border-color: white !important;
	}
	.pawrents p {
		font-size: clamp(1rem, 1vw, 1.5rem);
		text-align: center;
		font-weight: 500;
		color: white;
		padding-bottom: 4rem;
	}
	.semi-container {
		max-width: min(1200px, 100%);
		margin-inline: auto;
	}
	.pawrents h2 {
		text-align: center;
		color: white;
	}
	.pawrents {
		background-color: var(--pink);
		padding-block: 4rem;
	}
	.datas {
		display: flex;
		justify-content: flex-end;
		height: 100%;
	}
	.datas > div {
		display: grid;
		grid-template-rows: 1fr 1fr;
		justify-content: end;
		align-items: start;
		align-self: stretch;
		height: 100%;
	}

	.datas > div > div {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.datas strong {
		display: block;
		font-size: clamp(8rem, 10vw, 12rem);
		line-height: 100%;
		font-family: var(--font-anton);
		letter-spacing: 0.2rem;
	}
	.datas > div > div:first-child {
		background-color: var(--pink);
		border-radius: 1.5rem 1.5rem 0 0;
		color: white;
	}

	.datas > div > div:last-child {
		background-color: var(--yellow);
		border-radius: 0 0 1.5rem 1.5rem;
		color: var(--dark-50);
	}

	.datas h2 {
		display: block;
		margin-inline: 6rem;
		margin-block: 2rem;
		text-align: center;
		font-size: 1.5rem;
		font-weight: 600;
		line-height: 200%;
	}
	.impact {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		gap: 4rem;
		padding-block: 9rem;
	}

	@media (width < 800px) {
		.impact {
			grid-template-columns: 1fr;
		}
		.datas {
			display: block;
			height: auto;
		}
		.datas > div {
			display: block;
		}

		.datas h2 {
			padding-block: 3rem;
			margin: 0;
		}

		.datas strong {
			font-size: clamp(8rem, 15vw, 16rem);
		}
	}
	article > h2 {
		font-size: clamp(3.5rem, 5vw, 6rem);
		display: block;
		font-family: var(--font-anton);
		line-height: 115%;
		color: var(--dark-50);
		letter-spacing: 2%;
		padding-bottom: 2rem;
	}

	article > p {
		color: var(--dark-100);
		display: block;

		line-height: 115%;
		padding-bottom: 3rem;
	}

	article > a,
	.pawrents a {
		font-size: 1.5rem;
		font-weight: 600;
		padding: 0.75rem 1.5rem;
		color: var(--pink);

		border: 2px solid var(--pink);
		border-radius: 1.5rem;

		&:hover {
			background-color: var(--pink);
			color: white;
		}
	}

	.blank-space {
		width: 100%;
		height: clamp(2rem, 7vw + 1rem, 10rem);
		background-color: var(--pink);
        position: relative;
	}
	hgroup {
		color: white;
		position: absolute;
		bottom: 0;
		width: 100%;
	}
	h1 {
		display: block;
		font-size: clamp(5rem, 22vw, 22rem);
		font-family: var(--font-anton);
		line-height: 84%;
	}
	.blank-space h2 {
		display: block;
		font-weight: 700;
		line-height: 115%;
		font-size: 1.5rem;
        padding-bottom: clamp(1rem, 1vw, 2rem);
	}

    @media(width < 400px){
        .blank-space h2{
            text-align: center;
        }
    }
	.banner {
		width: 100%;
		height: clamp(43rem, 80vw + 6rem, 50rem);
		background-color: var(--dark-50);
        background-image: url('');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
	}
</style>
