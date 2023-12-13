<script>
	let image_numbers = Array.from({ length: 13 }, (_, index) => index + 1);

	import { page } from '$app/stores';

	let page_name;
	$: page_name = $page.url.pathname.substr($page.url.pathname.lastIndexOf('/'));
</script>

<div class="achivements {page_name === '/' || page_name === '/events' ? 'pink-background' : ''}">
	<section class="container">
		<h2 class={page_name === '/' || page_name === '/events' ? 'white-header' : ''}>
			ACHIVEMENTS
		</h2>
		<ul class="medias">
			{#each image_numbers as image (image)}
				<li class="media-images">
					<img src="../assets/media/{image}.png" alt="Media names" loading="lazy" />
				</li>
			{/each}
		</ul>
		<ul class="awards">
			<li>
				<div>
					<div>
						<h3>Awarded By Mr.Ramesh Sippy Sir</h3>
					</div>
				</div>
			</li>
			<li>
				<div>
					<div>
						<h3>Collaborated with actress Jacqueline Fernandez for the Cause</h3>
					</div>
				</div>
			</li>
		</ul>
	</section>
</div>

<style>
	.awards h3 {
		position: absolute;
		bottom: 1rem;
		display: block;
		text-align: center;
		width: 80%;
		font-weight: 700;
		font-size: clamp(1rem, 2vw, 2rem);
		line-height: 115%;
		color: white;
	}
	.awards > li > div > div {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.awards > li:first-child > div {
		width: 100%;
		aspect-ratio: 43 / 28;
		background:
			linear-gradient(180deg, rgba(0, 0, 0, 0) 39.75%, #000 100%),
			url('https://pawasana-dev.blr1.cdn.digitaloceanspaces.com/assets/achivement-1.png'),
			lightgray 50% / cover no-repeat;
		background-position: center;
		background-size: cover;
		border-radius: 1rem;
		position: relative;
	}
	.awards > li:last-child > div {
		width: 100%;
		aspect-ratio: 43 / 28;
		background:
			linear-gradient(180deg, rgba(0, 0, 0, 0) 39.75%, #000 100%),
			url('https://pawasana-dev.blr1.cdn.digitaloceanspaces.com/assets/achivement-2.png'),
			lightgray 50% / cover no-repeat;
		background-position: center;
		background-size: cover;
		border-radius: 1rem;
		position: relative;
	}
	.awards {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (width > 700px) {
		.awards {
			grid-template-columns: 1fr 1fr;
		}
	}
	.pink-background {
		background-color: var(--pink);
		color: white;
	}
	.white-header {
		color: white;
	}
	.achivements {
		padding-block: 4rem;
	}
	h2 {
		display: block;
		text-align: center;
		font-size: clamp(3.5rem, 5vw, 6rem);
		font-family: var(--font-anton);
		line-height: 115%;
		color: var(--pink);
		padding-bottom: 3.8rem;
	}

	.medias {
		display: flex;
		flex-wrap: wrap;
		gap: 1.3rem;
		justify-content: center;
		padding-bottom: 4rem;
	}
	@media (width < 700px) {
		.media-images > img {
			height: 15vw;
		}
		.medias {
			gap: 1rem;
		}
	}
</style>
