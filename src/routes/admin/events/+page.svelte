
<script>
	import AdoptionList from './AdoptionList.svelte';
	let dialog;
	let name, sex, age, description, tags, imageLink;

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
		<h2>Fill the below details to book the ticket</h2>
		<form enctype="multipart/form-data" method="post">
			<input type="text" bind:value={name} name="name" placeholder="Name of the dog" />
			<input type="text" bind:value={sex} name="sex" placeholder="Sex" />
			<input type="number" bind:value={age} name="age" placeholder="Age" />
			<textarea bind:value={description} name="description" rows="4" placeholder="Description"
			></textarea>
			<input type="text" bind:value={tags} name="tags" placeholder="Tags" />
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
			<button type="submit">Submit</button>
		</form>
	</div>
</dialog>

<style>
	h1 {
		display: block;
		font-size: 3rem;
		font-family: var(--font-anton);
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

	input,
	textarea {
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
