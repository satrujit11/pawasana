<script>
	import { onMount } from 'svelte';
	import { Splide, SplideSlide } from '@splidejs/svelte-splide';
	import '@splidejs/svelte-splide/css';
	import { format } from 'date-fns';

	let data = [];
	let dialog = {};
	let innerDialog = {};
	let uniqueStates = [];

	let filteredData = [];
	let selectedState = '';
	$: selectedState === ''
		? (filteredData = [...data])
		: (filteredData = data.filter((item) => item.state === selectedState));
	let bookingName, bookingEmail, bookingPhoneNumber;
	let childTicket = 1,
		adultTicket = 1;
	$: totalDiscount = Math.floor(adultTicket / 2) * 400;
	$: totalPrice = childTicket * 700 + adultTicket * 1200 - Math.floor(adultTicket / 2) * 400;
	const fetchdata = async () => {
		try {
			const response = await fetch('/api/event/valid');
			data = await response.json();
			uniqueStates = Array.from(new Set(data.map((item) => item.state)));
			filteredData = [...data];
			return { data };
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmit = async (params) => {
		try {
			const response = await fetch(`/api/payment`, {
				method: 'POST',
				body: JSON.stringify(params),
				headers: {
					'content-type': 'application/json'
				}
			});
			const data = await response.json();
			window.location.href = data.redirect_url;
			console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	const handlePayment = async (eventId) => {
		innerDialog[eventId].close();
		const bookingData = {
			name: bookingName,
			emailId: bookingEmail,
			phoneNumber: `${bookingPhoneNumber}`,
			eventId: eventId,
			childTicketNumber: childTicket,
			AdultTicketNumber: adultTicket,
			pricePaid: totalPrice
		};
		console.log(bookingData);

		await handleSubmit(bookingData);
	};

	const options = {
		perPage: 1,
		perMove: 1,
		arrows: false,
		pagination: false,
		autoplay: true
	};

	onMount(() => {
		fetchdata();
	});
</script>

<div class="background">
	<header class="container">
		<h1>PAWSOME UPCOMING EVENTS</h1>
		<p>Book your event ticket now.....</p>
		<a href="/about">MORE ABOUT US</a>
	</header>
</div>
<section class="container events-list">
	<div class="state-buttons">
		<button on:click={() => (selectedState = '')} class:active={selectedState === ''}>All</button>
		{#each uniqueStates as state (state)}
			<button class:active={selectedState === state} on:click={() => (selectedState = state)}>
				{state}
			</button>
		{/each}
	</div>
	{#if filteredData.length > 0}
		{#each filteredData as item (item.id)}
			<button on:click={() => dialog[item.id].showModal()} class="card">
				<article>
					<div class="image" style="background-image: url({item.imageLinks.split(',')[0]});"></div>
					<div class="content">
						<div class="adoption-details">
							<div>
								<h3>{item.name}</h3>
								<span>{format(new Date(item.eventDate), 'EEE MMM dd yyyy h:mm a')}</span>
							</div>
							<p class="event-description">{item.description}</p>
							<div class="location_details">
								<i class="material-symbols-outlined location"> location_on </i>{item.Landmark +
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
							<button class="button">Book Event</button>
						</div>
					</div>
				</article>
			</button>
			<dialog bind:this={dialog[item.id]} class="main-dialog">
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
					<div class="adoption-details dialog-adoption_details">
						<div>
							<h3>{item.name}</h3>
							<span>{format(new Date(item.eventDate), 'EEE MMM dd yyyy h:mm a')}</span>
						</div>
						<div class="location_details">
							<i class="material-symbols-outlined location"> location_on </i>{item.Landmark +
								', ' +
								item.area_and_street +
								', ' +
								item.city +
								', ' +
								item.state +
								', ' +
								item.pincode}
						</div>
						<p>{item.description}</p>
					</div>
					<form class="adoption-details ticket-form">
						<div>
							<label for="childTicket">Number of children</label>
							<div class="ticket-count">
								<button on:click={() => childTicket--} disabled={childTicket <= 0}
									><span class="material-symbols-outlined ticket-count-button-span">
										remove
									</span></button
								>
								<input
									type="number"
									placeholder="Number of children"
									bind:value={childTicket}
									name="childTicket"
								/>
								<button on:click={() => childTicket++}
									><span class="material-symbols-outlined ticket-count-button-span">
										add
									</span></button
								>
							</div>
						</div>
						<div>
							<label for="childTicket">Number of adults</label>

							<div class="ticket-count">
								<button on:click={() => adultTicket--} disabled={adultTicket <= 0}
									><span class="material-symbols-outlined ticket-count-button-span">
										remove
									</span></button
								>
								<input
									type="number"
									placeholder="Number of adults"
									bind:value={adultTicket}
									name="adultTicket"
								/>
								<button on:click={() => adultTicket++}
									><span class="material-symbols-outlined ticket-count-button-span">
										add
									</span></button
								>
							</div>
						</div>
					</form>
					<div class="actions">
						<button
							class="button submit-button"
							on:click={() => innerDialog[item.id].showModal()}
							disabled={totalPrice <= 0}
						>
							{totalPrice > 0
								? `Pay ₹${totalPrice} to book ticket`
								: `Add ticket to start booking`}</button
						>
					</div>
				</div>
			</dialog>

			<dialog bind:this={innerDialog[item.id]} class="innerDialog">
				<button
					on:click={() => {
						innerDialog[item.id].close();
					}}
				>
					<i class="material-symbols-outlined">close</i></button
				>
				<div>
					<h2>Booking Details</h2>
					<div class="preview">
						<h3>{item.name}</h3>
						{#if childTicket > 0}
							<div>
								<span>Number of Children tickets</span>
								<span>{childTicket}</span>
							</div>
						{/if}
						{#if adultTicket > 0}
							<div>
								<span>Number of Adult tickets</span>
								<span>{adultTicket}</span>
							</div>
						{/if}

						<div>
							<span>Discount</span>
							<span>₹{totalDiscount}</span>
						</div>
						<div>
							<span>Total Price</span>
							<span>₹{totalPrice}</span>
						</div>
					</div>
				</div>
				<div>
					<h2>Fill the below details to list a new adoption.</h2>
					<form on:submit|preventDefault={handlePayment(item.id)} method="post">
						<input type="text" bind:value={bookingName} name="name" placeholder="Name" />
						<input type="email" bind:value={bookingEmail} name="email" placeholder="Email" />
						<input
							type="number"
							bind:value={bookingPhoneNumber}
							name="age"
							placeholder="Phone Number"
						/>
						<button
							type="submit"
							disabled={!bookingName || !bookingEmail || !bookingPhoneNumber}
							class="submit-button">Submit</button
						>
					</form>
				</div>
			</dialog>
		{/each}
	{:else}
		<p>Loading......</p>
	{/if}
</section>

<style>
	.adoption-details > div > span {
		font-weight: 500;
		color: #8e8e8e;
	}
	.submit-button:disabled {
		opacity: 0.5;
	}
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

	.preview {
		padding: 1rem;
		background-color: #f5f5f5;
		border-radius: 0.3rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.preview h3 {
		font-size: 1.5rem;
		text-decoration: capitalize;
		margin-bottom: 0.5rem;
		color: var(--dark-50);
	}
	.preview div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		color: #898989;
		font-weight: 600;
	}
	.event-description {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 3;
	}
	.image {
		background-color: var(--yellow);
	}
	.ticket-form > div {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}
	.ticket-count {
		display: flex;
		align-items: center;
		gap: 1rem;
	}
	.ticket-count input {
		text-align: center;
		font-weight: 600;
		font-size: 1.5rem;
		padding-block: 0.5rem;
	}
	.ticket-count-button-span {
		background-color: var(--yellow);
		padding: 0.5rem;
		border-radius: 0.3rem;
	}
	.ticket-form {
		display: grid !important;
		grid-template-columns: 1fr 1fr !important;
		padding: 0 1.5rem !important;
		gap: 2rem !important;
	}
	@media (width < 750px) {
		.ticket-form {
			grid-template-columns: 1fr !important;
		}
	}
	.dialog-adoption_details {
		padding-bottom: 2rem !important;
	}
	.dialog-adoption_details .location_details {
		margin-bottom: 1rem;
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
		background: var(--dark-50);
		padding: 0.4rem;
		border-radius: 50%;
	}
	.innerDialog > button {
		padding: 1.5rem 0;
		background-color: var(--yellow);
		width: 100%;

		display: flex;
		justify-content: end;
	}

	.innerDialog > button > i {
		padding: 0.3rem;
		background-color: white;
		border-radius: 50%;
		margin-inline: 1.5rem;

		color: var(--dark-50);
	}
	.innerDialog > div {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 1.5rem;
	}
	.innerDialog > div > h2 {
		font-family: var(--font-anton);
		font-size: 1.5rem;
		color: var(--pink);
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	.innerDialog {
		margin: auto;
		border-radius: 1rem;
		border: none;
		min-width: min(40rem, 90%);

		&:focus {
			outline: none;
		}
	}

	button[type='submit'],
	input {
		display: block;
		border: none;
	}

	input {
		padding: 1rem 1.5rem;
		outline: none;
		background-color: #f5f5f5;
		border-radius: 1.5rem;
		width: -webkit-fill-available;
    width: -moz-available;
		&:focus {
			border: none;
			background-color: #f5f5f5;
		}
	}

	button[type='submit'] {
		padding-block: 0.9rem;
		width: 100%;
		text-align: center;
		background-color: var(--pink);
		border-radius: 1.5rem;
		font-family: var(--font-anton);
		color: white;
		font-size: 1rem;
	}
	.events-list {
		margin-bottom: 2rem;
	}
	header {
		padding-block: clamp(6rem, 4vw, 9rem) clamp(2rem, 3vw, 4rem);
	}
	.background {
		background-color: var(--pink);
		margin-bottom: 3.2rem;
	}
	h1,
	header p {
		display: block;
	}

	h1 {
		font-family: var(--font-anton);
		color: white;
		font-size: clamp(4rem, 23vw, 13rem);
		line-height: 115%;
		letter-spacing: 0rem;
		padding-bottom: 2rem;
	}

	header p {
		color: white;
		font-size: clamp(1.5rem, 2vw, 2.25rem);
		font-weight: 700;
		text-transform: uppercase;
		margin-bottom: clamp(3rem, 3vw, 4.25rem);
	}
	header a {
		font-size: 1.5rem;
		font-weight: 600;
		padding: 0.75rem 1.5rem;
		color: white;

		border: 2px solid white;
		border-radius: 1.5rem;

		&:hover {
			background-color: white;
			color: var(--pink);
		}
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
	.main-dialog {
		width: min(1200px, 95%);
	}
	dialog {
		width: min(39rem, 80%);
		margin: auto;
		border: none;
		border-radius: 1.5rem;
	}
	dialog .close-icon {
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
		margin: 1.5rem;
		gap: 1rem;
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
	.button {
		padding: 0.5rem 1rem !important;
		text-align: center;
		border-radius: 1.5rem;
		font-weight: 600;
		font-size: 1.5rem;
		justify-self: stretch;
		color: white;
		background-color: var(--pink);
		&:hover {
			background-color: var(--pink-hover);
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
