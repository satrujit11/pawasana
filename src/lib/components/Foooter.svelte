<div class="footer-bg">
	<footer class="container">
		<ul>
			<h2>GET IN TOUCH</h2>
			<ul>
				<li><a href="https://example.businesss.com">example.business.com</a></li>
				<li><address><a href="mailto:hello@example.com">hello@example.com</a></address></li>
			</ul>
		</ul>

		<ul>
			<h2>IMPORTANT LINK</h2>
			<ul>
				<li><a href="https://wearapaw.com">WEARAPAW</a></li>
				<li><a href="https://pawasana.com">Pawasana</a></li>
				<li><a href="/refund">Refund</a></li>
			</ul>
		</ul>

		<ul>
			<h2>VENTURES</h2>
			<ul>
				<li>Flat-104, Madhavi Enclave, Erragadda, Hyderabad, 756121</li>
			</ul>
		</ul>
	</footer>
</div>

<style>
	.footer-bg {
		background-color: var(--yellow);
		margin-top: auto;
	}

	h2 {
		font-family: var(--font-anton);
		display: block;
		font-size: clamp(3rem, 6vw, 4rem);
		color: white;
		line-height: 115%;
		padding-bottom: 1rem;
	}

	footer {
		display: flex;
		flex-direction: column;
		padding-block: 4rem;
		gap: 3rem;
		text-align: center;
	}

	a,
	li,
	address {
		all: unset;
		font-weight: 600;
		color: var(--dark-50);
		display: block;
		cursor: pointer;
		font-size: 1.2rem;
	}

	ul:last-child li {
		cursor: default;
	}

	@media (width > 600px) {
		footer {
			flex-direction: row;
			justify-content: space-between;
			text-align: left;
		}
	}
</style>
