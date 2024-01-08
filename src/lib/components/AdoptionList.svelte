<script>
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	import { onMount } from 'svelte';

	let data = [];
	const fetchdata = async () => {
			const response = await fetch('/api/adoption');
			data = await response.json();
			return { data };
	};

	const upperCase = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	const options = {
		type: 'loop',
		padding: '15rem',
		perPage: 1,
		perMove: 1,
		gap: '5rem',
		pagination: true,
		autoplay: true,
		breakpoints: {
			700: {
				type: 'default',
				padding: '1rem',
				gap: '2rem',
				arrows: false
			}
		}
	};

	onMount(() => {
		fetchdata();
	});
</script>

<section class="cards-container">
	{#if data.length > 0}
		<Splide {options}>
			{#each data as item (item.id)}
				<SplideSlide class="slide">
					<article>
						<div class="image" style="background-image: url({item.imageLink});"></div>
						<div class="content">
							<div class="adoption-details">
								<div class="title">
									<h3>{item.name}</h3>
									<div class="location_details">
										<i class="material-symbols-outlined location">
											location_on
										</i>{item.state}
									</div>
								</div>

								<div class="tag-items">
									<span class="tags">{upperCase(item.sex)}</span>
									<span class="tags">{item.age} months</span>
									{#each item.tags.split(',') as tag (tag)}
										<span class="tags">{upperCase(tag)}</span>
									{/each}
								</div>
								<p>{item.description}</p>
							</div>

							<a href="https://google-form.com" target="_blank">ADOPT</a>
						</div>
					</article>
				</SplideSlide>
			{/each}
		</Splide>
	{:else}
		<p>Loading......</p>
	{/if}
</section>

<style>
	.title {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.location_details {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--dark-100);
        padding: 0.5rem 1rem 0.5rem 0.5rem;
        border: 2px solid var(--pink);
        border-radius: 1.5rem;
        color: var(--pink)

	}
	.location {
		color: var(--pink);
	}
	.adoption-details p {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2;
	}
	.cards-container {
		width: min(1800px, 100vw);
		margin-inline: auto;
	}
	section {
		margin-bottom: 8rem;
	}

	.image {
		background-size: cover;
		background-position: center;
		background-color: #ececec;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	a {
		padding: 0.5rem 1rem !important;
		text-align: center;
		border: 0.15rem solid var(--pink);
		border-radius: 1.5rem;
		font-weight: 600;
		font-size: 1.5rem;
		justify-self: stretch;
		color: var(--pink);
		margin: 1.5rem;
		&:hover {
			background-color: var(--pink);
			color: white;
		}
	}
	.adoption-details > p {
		line-height: 115%;
		color: var(--dark-100);
	}
	.tag-items {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}
	.tags {
		padding: 0.5rem 1rem;
		background-color: var(--yellow);
		border-radius: 1rem;
		font-weight: 600;
		line-height: 115%;
	}
	.adoption-details {
		display: flex;
		flex-direction: column;
		gap: 1.3rem;

		padding: 1.5rem 1.5rem 0 1.5rem;
	}
	article {
		display: grid;
		grid-template-columns: 1fr 2fr;
		background-color: white;
		border-radius: 1.5rem;
		overflow: hidden;
	}
	@media (width < 980px) {
		article {
			grid-template-columns: 1fr !important;
		}
		.image {
			height: 15rem;
		}
	}

	h3 {
		font-size: 2rem;
		font-family: var(--font-anton);
		color: var(--dark-50);
		display: block;
	}
</style>
