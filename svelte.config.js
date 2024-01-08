import adapter from '@sveltejs/adapter-node';
import dotenv from 'dotenv';

dotenv.config();
/** @type {import('@sveltejs/kit').Config} */
const config = {
	vite: {
		server: {
			host: '0.0.0.0',
			port: 3000
		}
	},
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		adapter: adapter(),
		csrf: {
			checkOrigin: false
		}
	}
};

export default config;
