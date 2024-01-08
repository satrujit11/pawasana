<div class="main-container">
	<section class="container banner">
		<h1>OUR JOURNEY</h1>
		<div
			class="banner-image"
			style="
		background-image: url(https://pawasana-dev.s3.ap-south-1.amazonaws.com/assets/about_header.jpg);
            
        "
		></div>
	</section>
</div>

<section class="container details">
	<article class="started-des">
		<h2>HOW IT ALL STARTED</h2>
		<div>
			<p>
				<strong>Introducing the minds behind Pawasana: </strong>Annanya Nautiyal and Anwar
				Khan. Two years ago, fate brought them together in a hostel in Rishikesh, starting
				their remarkable journey. They bonded through their love of animals, forming a
				strong bond that would determine their destiny. Annanya had been rescuing dogs for
				over 6 years, and with Anwar joining, together they became an invincible dog rescue
				force. Which later made them realise the on-ground difficulties of adoption and
				money generation for rescue medical bills and vaccination. Which then gave birth to
				PAWASANA.
				<br />
			</p>
			<p>
				<strong>Introducing Pawsena: </strong>A cause-led experience in India with Indie
				rescued dogs to create awareness and provide education for adoption. We aim to
				create a safe space for our Indies to find love, warmth and home through our
				workshops.Not only this, by being a part you help us help more animals in need as a
				portion of the proceeds from you ticket goes to various animal shelters asa donation
				for expenses like medical bills, food, vaccination and shelter requirements.
			</p>
		</div>
	</article>

	<div class="images">
		<figure style="background-image: url(https://pawasana-dev.s3.ap-south-1.amazonaws.com/assets/about-1.jpg)"></figure>
		<figure style="background-image: url(https://pawasana-dev.s3.ap-south-1.amazonaws.com/assets/about-2.jpg)"></figure>
		<figure style="background-image: url(https://pawasana-dev.s3.ap-south-1.amazonaws.com/assets/about-3.jpg)"></figure>
	</div>
</section>

<!-- <div class="teams-sec"> -->
<!-- 	<section class="container teams"> -->
<!-- 		<h2>OUR TEAMS</h2> -->
<!-- 		<article> -->
<!-- 			<figure></figure> -->
<!-- 			<figure></figure> -->
<!-- 			<figure></figure> -->
<!-- 			<figure></figure> -->
<!-- 			<figure></figure> -->
<!-- 			<figure></figure> -->
<!-- 		</article> -->
<!-- 	</section> -->
<!-- </div> -->

<style>
  
	/*
	.teams > article {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}
	@media (width > 900px) {
		.teams > article {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	@media (600px < width <= 900px) {
		.teams > article {
			grid-template-columns: 1fr 1fr;
		}
	}

	.teams-sec {
		background-color: var(--dark-50);
		padding-block: 4rem;
	}

	.teams > h2 {
		display: block;
		text-align: center;
		font-size: clamp(3.5rem, 5vw, 6rem);
		font-family: var(--font-anton);
		line-height: 115%;
		color: white;
		padding-bottom: 2rem;
	}
*/
	.details {
		padding-block: 1rem 6rem;
	}

	.images {
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}

	@media (width > 900px) {
		.images {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	@media (600px < width <= 900px) {
		.images {
			grid-template-columns: 1fr 1fr;
		}
		.images > figure:last-child {
			grid-column: span 2;
		}
	}

	figure {
		background-color: yellow;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
		height: 25rem;
		border-radius: 1rem;
	}

	.started-des {
		padding-block: 4.25rem;
		display: grid;
		gap: 2rem;
		grid-template-columns: 1fr;
	}

	.started-des > div {
		padding-top: 0.5rem;
	}

	@media (width <= 600px) {
		.banner {
			max-width: 95% !important;
		}
		.banner-image {
			border-radius: 1rem 1rem 0 0 !important;
		}
	}

	@media (width > 600px) {
		.started-des {
			grid-template-columns: 1fr 2fr;
		}
	}

	.started-des > div {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	strong {
		all: unset;
		font-weight: 500;
		color: var(--dark-100);
	}

	.banner-image {
		width: 100%;
		height: 35rem;
		border-radius: 2.75rem 2.75rem 0 0;

		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
	}

	h1 {
		display: block;
		text-align: center;
		font-size: clamp(2rem, 18vw, 17rem);
		font-family: var(--font-anton);
		color: white;
	}

	p {
		line-height: 115%;
		font-size: 1.25rem;
		margin-bottom: 1rem;
		color: var(--dark-25);
	}

	.main-container {
		background-color: var(--yellow);
	}

	.started-des > h2 {
		font-size: clamp(3.5rem, 5vw, 6rem);
		font-family: var(--font-anton);
		line-height: 115%;
		color: var(--dark-50);
	}
</style>
