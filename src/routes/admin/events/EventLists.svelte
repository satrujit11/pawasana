<script>
	import { onMount } from 'svelte';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';

	let data = [];
	let dialog = {};
	const fetchdata = async () => {
		try {
			const response = await fetch('/api/event');
			data = await response.json();
			console.log(data);
			return { data };
		} catch (err) {
			console.log(err);
		}
	};

	const options = {
		perPage: 1,
		perMove: 1,
		arrows: false,
		pagination: false,
		autoplay: true
	};

	const handleDelete = async (adoptionId, imageLinks, spreadSheetId) => {
		try {
			const response = await fetch(`http://localhost:5173/api/event`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ id: adoptionId, imageLinks: imageLinks, spreadSheetId: spreadSheetId })
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
		    console.log(JSON.stringify({ id: adoptionId, imageLinks: imageLinks }))
			const data = await response.json();
			console.log(data); // Handle the successful response
		} catch (error) {
			console.error('Error:', error); // Handle errors
		}
	};

	onMount(() => {
		fetchdata();
	});
</script>

<section class="container">
	{#if data.length > 0}
		{#each data as item (item.id)}
			<button on:click={() => dialog[item.id].showModal()} class="card">
				<article>
					<div
						class="image"
						style="background-image: url({item.imageLinks.split(',')[0]});"
					></div>
					<div class="content">
						<div class="adoption-details">
							<h3>{item.name}</h3>
							<span>{new Date(item.eventDate)}</span>
							<p>{item.description}</p>
							<div class="location_details">
								<i class="material-symbols-outlined location">
									location_on
								</i>{item.Landmark +
									', ' +
									item.area_and_street +
									', ' +
									item.city +
									', ' +
									item.state +
									', ' +
									item.pincode}
							</div>
						</div>
						<div class="actions">
							<a
								href={`https://docs.google.com/spreadsheets/d/${item.spreadSheetId}`}
								target="_blank">Bookings</a
							>

							<form on:submit={() => handleDelete(item.id, item.imageLinks, item.spreadSheetId)}>
								<button type="submit">Delete</button>
							</form>
						</div>
					</div>
				</article>
			</button>
			<dialog bind:this={dialog[item.id]}>
				<button class="close-icon" on:click={() => dialog[item.id].close()}
					><i class="material-symbols-outlined">close</i></button
				>
				<Splide {options}>
					{#each item.imageLinks.split(',') as imageLink (imageLink)}
						<SplideSlide>
							<div class="image" style="background-image: url({imageLink});"></div>
						</SplideSlide>
					{/each}
				</Splide>
				<div class="content">
					<div class="adoption-details">
						<h3>{item.name}</h3>
						<span>{new Date(item.eventDate)}</span>
						<p>{item.description}</p>
						<div class="location_details">
							<i class="material-symbols-outlined location">
								location_on
							</i>{item.Landmark +
								', ' +
								item.area_and_street +
								', ' +
								item.city +
								', ' +
								item.state +
								', ' +
								item.pincode}
						</div>
					</div>
					<div class="actions">
						<a
							href={`https://docs.google.com/spreadsheets/d/${item.spreadSheetId}`}
							target="_blank">Bookings</a
						>
					</div>
				</div>
			</dialog>
		{/each}
	{:else}
		<p>Loading......</p>
	{/if}
</section>

<style>
    .adoption-details span{
        color: #7e7e7e;
        font-weight: 500;
    }
	.location_details {
		display: flex;
		align-items: center;
		gap: 1rem;
		color: var(--dark-100);
	}
	.location {
		color: white;
		background: var(--dark-50);
		padding: 0.4rem;
		border-radius: 50%;
	}
	dialog h3 {
		font-size: 3rem;
	}
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.4);
	}
	.card {
		margin-bottom: 2rem;
		width: 100%;
	}
	dialog {
		width: min(1200px, 95%);
		margin: auto;
		border: none;
		border-radius: 1.5rem;
	}
	dialog button {
		position: absolute;
		top: 1rem;
		right: 1rem;
		z-index: 9999;
	}
	dialog i {
		padding: 0.3rem;
		background-color: white;
		border-radius: 50%;
	}
	dialog .image {
		width: 100%;
		height: clamp(15rem, 25vw, 25rem);
	}
	.actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		margin: 1.5rem;
		gap: 1rem;
	}
	dialog .actions {
		grid-template-columns: 1fr;
	}
	article {
		background: #fff;
		box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);
	}
	section {
		margin-bottom: 8rem;
	}

	.image {
		background-size: cover;
		background-position: center;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	a,
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
	.adoption-details > p {
		line-height: 115%;
		color: var(--dark-100);
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
	@media (width < 750px) {
		article {
			grid-template-columns: 1fr !important;
		}
		.image {
			height: 21rem;
		}
	}

	h3 {
		font-size: 2rem;
		font-family: var(--font-anton);
		color: var(--dark-50);
		display: block;
		text-transform: uppercase;
	}
</style>
