<script>
	import Gallery from '$lib/components/Gallery.svelte';

	let imageLink;
</script>

<section class="container">
	<h1>Gallery</h1>
	<form enctype="multipart/form-data" method="post">
		<label>
			<div class="file-upload">
				{#if imageLink === undefined}
					<i class="material-symbols-outlined">upload</i>
					<p>Click here to upload the image to gallery</p>
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
		<button type="submit" disabled={!imageLink}>Submit</button>
	</form>
</section>

<Gallery />

<style>
  section {
    margin-bottom: 4rem;
  }
	button:disabled {
		background-color: #f2c7d6;
	}
	h1 {
		display: block;
		font-size: 3rem;
		font-family: var(--font-anton);
		color: var(--dark-50);
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
		margin-bottom: 1.5rem;

		color: var(--dark-50);
		max-height: 16rem;
	}
	input[type='file'] {
		display: none;
	}
	button {
		padding-block: 1rem;
		width: 100%;
		background-color: var(--pink);
		border-radius: 1.5rem;
		text-align: center;
		font-family: var(--font-anton);
		color: white;
	}
</style>
