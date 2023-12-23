<script>
	import '../app.css';
	import { page } from '$app/stores';
	import Foooter from '$lib/components/Foooter.svelte';
	import Achivements from '$lib/components/Achivements.svelte';
	import { afterUpdate } from 'svelte';
	import { onDestroy } from 'svelte';
	import { auth } from '$lib/stores/authStore';

	let dialog;
	let page_name;
	$: page_name = $page.url.pathname.substr($page.url.pathname.lastIndexOf('/'));
	afterUpdate(() => dialog.close());

	let page_url;
	$: page_url = $page.url.pathname;

	onDestroy(() => {
		if (page_name === '/adoptions' || page_name === '/events' || page_name === '/gallery') {
            console.log(page_name)
		}
        else{
            auth.set(false)
            console.log(page_name)
        }
        console.log($auth)
	});
</script>

{#if page_url.includes('/admin') || page_url.includes('/payment')}
	<slot />
{:else}
	<div class="body">
		<div class="main-page">
			<div class="main-section {page_name == '/' ? 'transparent' : ''}">
				<header class="container">
					<a href="/" style="font-weight: bold;">Pawasana</a>

					<nav>
						<ul>
							<li>
								<a href="/" class={page_name == '/' ? 'navitem_color' : ''}>Home</a>
							</li>
							<li>
								<a
									href="/events"
									class={page_name == '/events' ? 'navitem_color' : ''}>Events</a
								>
							</li>
							<li>
								<a
									href="/adoptions"
									class={page_name == '/adoptions' ? 'navitem_color' : ''}
									>Adoptions</a
								>
							</li>
							<li>
								<a
									href="/about"
									class={page_name == '/about' ? 'navitem_color' : ''}>About</a
								>
							</li>
						</ul>
					</nav>
					<div>
						<a href="https://www.google.com" class="main-action" target="_blank"
							>Poonch</a
						>
						<button on:click={() => dialog.showModal()}
							><i class="material-symbols-outlined menu-draw">menu</i></button
						>
					</div>

					<dialog bind:this={dialog}>
						<div>
							<button on:click={() => dialog.close()}>
								<i class="material-symbols-outlined">close</i>
							</button>
							<nav>
								<ul>
									<li>
										<a href="/" class={page_name == '/' ? 'navitem_color' : ''}
											>Home</a
										>
									</li>
									<li>
										<a
											href="/events"
											class={page_name == '/events' ? 'navitem_color' : ''}
											>Events</a
										>
									</li>
									<li>
										<a
											href="/adoptions"
											class={page_name == '/adoptions' ? 'navitem_color' : ''}
											>Adoptions</a
										>
									</li>
									<li>
										<a
											href="/about"
											class={page_name == '/about' ? 'navitem_color' : ''}
											>About</a
										>
									</li>
								</ul>
							</nav>
						</div>
					</dialog>
				</header>
			</div>

			<slot />
		</div>
		{#if page_name != '/refund' && page_name != '/success'}
			{#if page_name != '/'}
				<Achivements />
			{/if}
			<Foooter />
		{/if}
	</div>
{/if}

<style>
	.body {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.transparent {
		background-color: transparent !important;
		position: absolute;
		width: 100%;
	}
	.navitem_color {
		color: var(--pink);
	}
	.menu-draw {
		font-size: xx-large;
		display: block;
	}
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-block: clamp(1rem, 1vw, 2rem);
		color: white;

		font-size: 1.5rem;
	}

	dialog {
		width: 100vw;
		height: 100vh;
		max-width: 100vw;
		max-height: 100vh;
		border: none;
		background-color: var(--yellow);
		align-items: end;

		color: var(--dark-50);
		padding: 2rem;

		font-size: 2rem;
		font-weight: 500;

		& i {
			font-size: xx-large;
		}
	}
	dialog:focus,
	dialog:hover {
		border: none;
	}

	.main-section {
		background-color: var(--dark-50);
	}
	ul {
		display: flex;
		gap: 2rem;
	}

	.main-action {
		padding: 0.5rem 1.5rem;
		border-radius: 0.5rem;
		background-color: var(--pink);
		font-weight: 700;

		&:hover {
			background-color: var(--pink-hover);
		}
	}

	header > nav {
		display: none;
		font-weight: 500;
	}
	dialog nav {
		width: 100%;
	}
	dialog ul {
		display: flex;

		flex-direction: column;
	}

	dialog > div {
		display: flex;
		flex-direction: column;
		align-items: end;
	}

	li:hover {
		color: var(--pink-hover);
	}

	header > div {
		display: flex;
		align-items: center;
	}
	@media (width <= 600px) {
		header > div {
			gap: 2rem;
		}
	}
	@media (width > 600px) {
		header > nav {
			display: block;
		}

		dialog {
			display: none;
		}
		.menu-draw {
			display: none;
		}
	}
</style>
