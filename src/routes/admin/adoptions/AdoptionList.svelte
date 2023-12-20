<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
    import { PUBLIC_WEBSITE_LINK } from '$env/static/public';

	let data = [];
	let uniqueStates = [];
	let filteredData = [];
	let selectedState = '';
	$: selectedState === ''
		? (filteredData = [...data])
		: (filteredData = data.filter((item) => item.state === selectedState));

	const fetchData = async () => {
		try {
			const response = await fetch('/api/adoption');
			data = await response.json();
			uniqueStates = Array.from(new Set(data.map((item) => item.state)));
			filteredData = [...data];
			return { data };
		} catch (err) {
			console.log(err);
		}
	};
	const handleDelete = async (adoptionId, imageLink) => {
		try {
			const response = await fetch(`${PUBLIC_WEBSITE_LINK}/api/adoption`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: adoptionId, imageLink: imageLink })
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			console.log(data); // Handle the successful response
		} catch (error) {
			console.error('Error:', error); // Handle errors
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
	<div class="state-buttons">
		<button on:click={() => (selectedState = '')} class:active={selectedState === ''}
			>All</button
		>
		{#each uniqueStates as state (state)}
			<button class:active={selectedState === state} on:click={() => (selectedState = state)}>
				{state}
			</button>
		{/each}
	</div>

	{#if filteredData.length > 0}
		<div class=" adoption-grid">
			{#each filteredData as item (item.id)}
				<article>
					<div class="adoption-details-button">
						<img src={item.imageLink} alt="Dog" class="fluid-image" loading="lazy" />
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
					{#if page_url.includes('/admin')}
						<div class="actions">
							<form on:submit = {() => handleDelete(item.id, item.imageLink)}>
								<button type="submit">Delete</button>
							</form>
						</div>
					{/if}
					{#if !page_url.includes('/admin')}
						<a href="https://google-form.com" target="_blank">ADOPT</a>
					{/if}
				</article>
			{/each}
		</div>
	{:else}
		<p class="loading">Loading......</p>
	{/if}
</section>

<style>
	.state-buttons {
		display: flex;
		gap: 1rem;
		margin-bottom: 3.5rem;
		flex-wrap: wrap;
	}
	.state-buttons button {
		padding: 0.5rem 1rem;
		border-radius: 1rem;
		font-size: 1.5rem;
		font-weight: 600;
		border: 0.75px solid #eb8aad;
		color: var(--dark-50);
	}
	.state-buttons button.active {
		background-color: #eb8aad;
		color: white;
	}
	.actions {
		margin: 1.5rem;
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
	}
	.actions button {
		padding: 0.5rem 1rem !important;
		text-align: center;
		border: 0.15rem solid var(--pink);
		border-radius: 1.5rem;
		font-weight: 600;
		font-size: 1.5rem;
		justify-self: stretch;
		color: var(--pink);
        width: -webkit-fill-available;
		&:hover {
			background-color: var(--pink);
			color: white;
		}
	}
	.loading {
		text-align: center;
	}
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

	p {
		color: var(--dark-100);
		overflow-wrap: anywhere;
	}
</style>
