import { redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const email = data.get('email');
		const phoneNumber = data.get('phoneNumber');
		const transactionId = data.get('transactionId');

		const response = await fetch(`http://0.0.0.0:3000/api/booking`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				email,
				phoneNumber,
				transactionId
			})
		});

		const result = await response.json();
		console.log('error :', result);
		if (
			result.status === 404 ||
			result.status === 400 ||
			result.status === 500 ||
			result.status === 401 ||
			result.message === 'Internal Error'
		) {
			throw redirect(303, '/refund/error');
		} else throw redirect(303, '/refund/success');
	}
};
