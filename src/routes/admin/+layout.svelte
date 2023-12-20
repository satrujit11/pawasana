<script>
	import { page } from '$app/stores';
	import { onDestroy } from 'svelte';
	import { auth } from '$lib/stores/authStore';
	let page_name;
	$: page_name = $page.url.pathname.substr($page.url.pathname.lastIndexOf('/'));
	onDestroy(() => {
		if (page_name === '/adoptions' || page_name === '/events' || page_name === '/gallery') {
            console.log(page_name)
		}
        else{
            auth.set(false)
        }
        console.log($auth)
	});
</script>

{#if page_name !== '/admin'}
	<header>
		<nav>
			<a
				href="/admin/adoptions"
				class={page_name == '/adoptions' ? 'navitem_color' : ''}
				data-sveltekit-preload-data="hover">Adoptions</a
			>
			<a
				href="/admin/events"
				class={page_name == '/events' ? 'navitem_color' : ''}
				data-sveltekit-preload-data="hover">Events</a
			>

			<a
				href="/admin/gallery"
				class={page_name == '/gallery' ? 'navitem_color' : ''}
				data-sveltekit-preload-data="hover">Gallery</a
			>
		</nav>
	</header>
{/if}
<slot />

<style>
	nav {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	a {
		font-size: 1.5rem;
		font-weight: 500;
		color: white;
		width: 100%;
		text-align: center;
		padding-block: 1rem;
	}
	.navitem_color {
		background-color: var(--pink);
	}

	header {
		background-color: var(--dark-50);
	}
</style>
