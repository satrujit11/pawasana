
<script>
	import { onMount } from 'svelte';
	let data = [];
	const handleImage = async () => {
		const response = await fetch('/api/gallery');
		data = await response.json();
		console.log(data);
		return { data };
	};
	onMount(() => {
		handleImage();
	});
</script>


<section class="gallery container">
	{#if data.length > 0}
		{#each data as item (item.id)}
			<img src={item.imageLink} alt="Gallery{item.id}" loading="lazy" />
		{/each}
	{/if}
</section>

<style>
	.gallery {
		padding-top: 2rem;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1rem;
	}
	@media (width < 600px) {
		.gallery {
			grid-template-columns: 1fr;
		}
	}
    .gallery img{
        width: 100%
    }

</style>
