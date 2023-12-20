<script>
	import Map from '$lib/components/Map.svelte';
	import { onMount } from 'svelte';
	let data = [];
	let responseData = [];
	let uniqueStates = [];
	const fetchdata = async () => {
		try {
			const response = await fetch('/api/event/valid');
			responseData = await response.json();
			data = responseData.slice(0, 3);
			uniqueStates = Array.from(new Set(responseData.map((item) => item.state)));
			return { data };
		} catch (err) {
			console.log(err);
		}
	};

	onMount(() => {
		fetchdata();
	});
</script>

<div class="background">
	<section class="container">
		<h2>SNIFFING OUT FUTURE EVENTS?</h2>
		{#if data.length > 0}
			<div class="events">
				<div id="map-container">
					{#if uniqueStates.length > 0}
						<Map states={uniqueStates} />
					{/if}
				</div>
				<div class="events-list">
					<div>
						{#each data as item}
							<article>
								<div
									class="image"
									style="background-image: url({item.imageLinks.split(',')[0]});"
								></div>
								<div class="content">
									<h3>{item.name}</h3>
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
									<a href="/events">Book Ticket</a>
								</div>
							</article>
						{/each}
					</div>
					<a href="/events">FETCH ALL EVENTS</a>
				</div>
			</div>
		{/if}
	</section>
</div>

<style>
#map-container {
    position: relative;
}
	.content p {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2;
	}
	.location_details {
		display: flex;
		align-items: center;
		gap: 1rem;
		color: var(--dark-100);
		font-weight: 500;
	}
	.location {
		color: white;
		background: var(--pink);
		padding: 0.4rem;
		border-radius: 50%;
	}
	.image {
		width: 100%;
		height: 100%;
		background-color: #ececec;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
	.events-list article {
		background-color: white;
		display: grid;
		grid-template-columns: 1.5fr 3fr;
		border-radius: 1rem;
		overflow: hidden;
		box-shadow: 0px 0px 20px 0px rgba(162, 132, 11, 0.2);
	}
    .events-list > div{
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
	@media (width < 513px) {
		.events-list article {
			grid-template-columns: 1fr;
			grid-template-rows: 1fr 1fr;
		}
	}
	.content {
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.events-list {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1.5rem;
	}
	.content div {
		margin-block: 1rem;
	}
	h3,
	p {
		display: block;
	}
	.events-list > a {
		border-radius: 1.5rem;
		border: 2px solid #3b3b3b;
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--dark-50);
	}
	.events-list > a:hover {
		background-color: var(--dark-50);
		color: white;
	}
	a {
		display: block;
		padding-block: 0.5rem;
		width: 100%;
		text-align: center;
	}

	.content > a {
		display: block;
		padding-block: 0.5rem;
		width: 100%;
		text-align: center;
		background-color: var(--pink);
		font-family: var(--font-anton);
		color: white;
		border-radius: 1.5rem;
	}
	.content > a:hover {
		background-color: var(--pink-hover);
	}
	h3 {
		font-size: 1.5rem;
		font-family: var(--font-anton);
		text-transform: capitalize;
		color: var(--dark-50);
		margin-bottom: 0.5rem;
	}
	#map-container {
		width: 100%;
	}

	.events {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}
	@media (width > 900px) {
		.events {
			grid-template-columns: 1fr 1fr;
		}
	}
	.events > div {
		width: 100%;
		height: 100%;
	}
	h2 {
		display: block;
		text-align: center;
		color: var(--dark-50);
		font-family: var(--font-anton);
		font-size: clamp(3.5rem, 5vw, 6rem);
		line-height: 115%;
		padding-bottom: 3.5rem;
	}
	.background {
		background-color: var(--yellow);
	}

	section {
		padding-block: 4rem;
	}
</style>
