<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	let data = [];

	const fetchData = async () => {
		try {
			const response = await fetch('/api/adoption');
			data = await response.json();
			console.log(data);
			if (data.length > 0) {
				console.log(true);
			}
			return { data };
		} catch (err) {
			console.log(err);
		}
	};

	const upperCase = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	onMount(async () => await fetchData());

	let page_url;
	$: page_url = $page.url.pathname;
</script>

<section>
	{#if data.length > 0}
		<div class=" adoption-grid">
			{#each data as item (item.id)}
				<article>
					<div class="adoption-details-button">
						<img src={item.imageLink} alt="Dog" class="fluid-image" loading="lazy"/>
						<div class="adoption-details">
							<h3>{item.name}</h3>
							<div class="tag-items">
								<span class="tags">{upperCase(item.sex)}</span>
								<span class="tags">{item.age} months</span>
								{#each item.tags.split(',') as tag (tag)}
									<span class="tags">{upperCase(tag)}</span>
								{/each}
							</div>
							<p>{item.description}</p>
						</div>
					</div>
					{#if !page_url.includes('/admin')}
						<a href="https://google-form.com" target="_blank">ADOPT</a>
					{/if}
				</article>
			{/each}
		</div>
	{:else}
		<p>Loading......</p>
	{/if}
</section>

<style>
	.fluid-image {
		aspect-ratio: 2 / 1;
		width: 100%;
		object-fit: cover;
		overflow: hidden;
	}
	article > a {
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
	.adoption-details-button {
		display: flex;
		flex-direction: column;
	}
	.adoption-details {
		display: flex;
		flex-direction: column;
		gap: 1.3rem;

		padding: 1.5rem;
	}
	.adoption-grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		justify-content: center;
		gap: 2rem;
	}

	@media (width < 800px) {
		.adoption-grid {
			grid-template-columns: 1fr;
		}
	}
	h3 {
		font-size: 2rem;
		font-family: var(--font-anton);
		color: var(--dark-50);
		display: block;
	}
	article {
		border-radius: 1.5rem;
		overflow: hidden;
		box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
	}

    p{
        color: var(--dark-100);
        overflow-wrap:  anywhere;
    }
</style>
