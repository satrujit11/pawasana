<script>
	import { onMount } from 'svelte';
	let data = [];
	const handleImage = async () => {
		const response = await fetch('/api/gallery');
		data = await response.json();
		return { data };
	};
	onMount(() => {
		handleImage();
	});
</script>

<section class="gallery container">
	{#if data.length > 0}
		{#each data as item (item.id)}
			<div class="background-image" style="background-image: url({item.imageLink});"></div>
		{/each}
	{/if}
</section>

<style>
	.background-image {
		width: 100%;
		height: 20rem;
		background-position: center center;
		background-size: cover;
	}
	.background-image:nth-child(1) {
		border-radius: 1.5rem 0 0 0;
	}

	.background-image:nth-child(4) {
		border-radius: 0 1rem 0 0;
	}

	.gallery {
		padding-top: 2rem;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1rem;
	}
	@media (width < 1000px) {
		.gallery {
			grid-template-columns: 1fr 1fr;
		}

		.background-image:nth-child(1) {
			border-radius: 1.5rem 0 0 0;
		}

		.background-image:nth-child(2) {
			border-radius: 0 1.5rem 0 0;
		}
		.background-image:nth-child(4) {
			border-radius: 0;
		}
	}
	@media (width < 600px) {
		.gallery {
			grid-template-columns: 1fr;
		}
		.background-image:nth-child(1) {
			border-radius: 1.5rem 1.5rem 0 0;
		}

		.background-image:nth-child(2) {
			border-radius: 0;
		}
	}
</style>
