<script>

</script>
<div>
	<header class="container">
		<nav>
			<a href="admin/adoptions">Adoptions</a>
			<a href="/events">Events</a>
		</nav>
	</header>
</div>
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

	div {
		background-color: var(--dark-50);
	}
</style>
