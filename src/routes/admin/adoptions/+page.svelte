<script>
	import AdoptionList from './AdoptionList.svelte';
	let dialog;
	let name, sex, age, description, tags, imageLink, state;

	let states = [
		'Andhra Pradesh',
		'Arunachal Pradesh',
		'Assam',
		'Bihar',
		'Chhattisgarh',
		'Goa',
		'Gujarat',
		'Haryana',
		'Himachal Pradesh',
		'Jharkhand',
		'Karnataka',
		'Kerala',
		'Madhya Pradesh',
		'Maharashtra',
		'Manipur',
		'Meghalaya',
		'Mizoram',
		'Nagaland',
		'Odisha',
		'Punjab',
		'Rajasthan',
		'Sikkim',
		'Tamil Nadu',
		'Telangana',
		'Tripura',
		'Uttar Pradesh',
		'Uttarakhand',
		'West Bengal',
		'Andaman and Nicobar Islands',
		'Chandigarh',
		'Dadra and Nagar Haveli',
		'Daman and Diu',
		'Delhi',
		'Lakshadweep',
		'Puducherry',
		'Jammu and Kashmir'
	];
	const handleDrop = (event) => {
		const file = event.dataTransfer.files[0];
		console.log(file);
		imageLink = [file];
	};
</script>

<section class="container">
	<div>
		<h1>Adoptions</h1>
		<button on:click={() => dialog.showModal()}>Add Adoption</button>
	</div>
	<AdoptionList />
</section>
<dialog bind:this={dialog}>
	<button
		on:click={() => {
			dialog.close();
		}}
	>
		<i class="material-symbols-outlined">close</i></button
	>
	<div>
		<h2>Fill the below details to list a new adoption.</h2>
		<form enctype="multipart/form-data" method="post">
			<input type="text" bind:value={name} name="name" placeholder="Name of the dog" />
			<select bind:value={sex} name="sex" placeholder="Select Sex">
				<option value="" disabled selected class="placeholder">Select Sex</option>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
			</select>
			<input type="number" bind:value={age} name="age" placeholder="Age" />
			<textarea bind:value={description} name="description" rows="4" placeholder="Description"
			></textarea>
			<input type="text" bind:value={tags} name="tags" placeholder="Tags" />
			<select bind:value={state} name="state" placeholder="Select state">
				<option value="" disabled selected class="placeholder">Select state</option>
				{#each states as s (s)}
					<option value={s}>{s}</option>
				{/each}
			</select>

			<label>
				<!-- svelte-ignore a11y-no-static-element-interactions-->
				<div
					class="file-upload"
					on:drop|preventDefault={handleDrop}
					on:dragover|preventDefault={() => {}}
				>
					{#if imageLink === undefined}
						<i class="material-symbols-outlined">upload</i>
						<p>Click here to upload the image of the dog</p>
					{:else}
						<img
							src={URL.createObjectURL(imageLink[0])}
							style="max-height: 10rem"
							alt="uploaded"
						/>
					{/if}
				</div>
				<input type="file" name="imageLink" bind:files={imageLink} accept="image/*" />
			</label>
			<button
				type="submit"
				disabled={!name || !sex || !age || !description || !tags || !imageLink || !state}
                class="submit-button"
				>Submit</button
			>
		</form>
	</div>
</dialog>

<style>

	.submit-button:disabled {
		background-color: #f2c7d6;
	}
	.placeholder {
		color: #c8c8c8;
	}
	h1 {
		display: block;
		font-size: 3rem;
		font-family: var(--font-anton);
		color: var(--dark-50);
	}

	section {
		padding-top: 2rem;
	}

	section > div {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		margin-bottom: 2rem;
	}

	.container > div > button {
		padding: 1rem 2rem;
		color: white;
		font-family: var(--font-anton);
		background-color: var(--pink);
		border-radius: 0.5rem;

		&:hover {
			background-color: var(--pink-hover);
		}
	}
	.file-upload > i {
		padding: 1rem;
		background-color: #f5f5f5;
		border-radius: 4rem;
	}
	.file-upload {
		cursor: pointer;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		border: 3px solid #f5f5f5;
		border-radius: 1.5rem;

		color: var(--dark-50);
		max-height: 16rem;
	}
	input[type='file'] {
		display: none;
	}
	dialog > button {
		padding: 1.5rem 0;
		background-color: var(--yellow);
		width: 100%;

		display: flex;
		justify-content: end;
	}

	dialog > button > i {
		padding: 0.3rem;
		background-color: white;
		border-radius: 1rem;
		margin-inline: 1.5rem;

		color: var(--dark-50);
	}
	dialog > div {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		padding: 1.5rem;
	}
	dialog > div > h2 {
		font-family: var(--font-anton);
		font-size: 1.5rem;
		color: var(--pink);
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}
	dialog {
		margin: auto;
		border-radius: 1rem;
		border: none;
		min-width: min(40rem, 90%);

		&:focus {
			outline: none;
		}
	}

	button[type='submit'],
	input,
	textarea {
		display: block;
		border: none;
	}
	select {
		all: unset;
		border: none;
		padding-inline: 1.5rem !important;
		outline: none;
	}
	input,
	textarea,
	select {
		padding: 1rem 1.5rem;
		outline: none;
		background-color: #f5f5f5;
		border-radius: 1.5rem;
		width: -webkit-fill-available;
		&:focus {
			border: none;
			background-color: #f5f5f5;
		}
	}
	textarea {
		resize: none;
		overflow-wrap: break-word;
	}

	input[type='file'] {
		background-color: transparent;
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
</style>
