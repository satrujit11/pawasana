import { error, json } from '@sveltejs/kit';
import { bookingData } from '$lib/stores/bookingData';
import crypto from 'crypto';

const setPaymentData = (merchantTransactionId, amount, merchantUserId, phoneNumber) => {
	const payload = JSON.stringify({
		merchantId: 'PGTESTPAYUAT',
		merchantTransactionId: merchantTransactionId,
		merchantUserId: merchantUserId,
		amount: amount,
		redirectUrl: `www.pawasana.com/payment/${merchantTransactionId}`,
		redirectMode: 'REDIRECT',
		mobileNumber: phoneNumber,
		paymentInstrument: {
			type: 'PAY_PAGE'
		}
	});

	const payloadMain = Buffer.from(payload).toString('base64');
	const saltkey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
	const saltIndex = 1;
	const string = payloadMain + '/pg/v1/pay' + saltkey;
	const sha256 = crypto.createHash('sha256').update(string).digest('hex');
	const xVerify = sha256 + '###' + saltIndex;

	return {
		payloadMain: payloadMain,
		xVerify: xVerify
	};
};

const paymentRequest = async (payloadMain, xVerify) => {
	const response = await fetch('https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-VERIFY': xVerify
		},
		body: JSON.stringify({
			request: payloadMain
		})
	});
	const data = await response.json();
    console.log(data)
	if (data.success) {
		const redirectUrl = data.data.instrumentResponse.redirectInfo.url;
		return { redirectUrl: redirectUrl };
	} else {
		console.log(data);
		return { message: 'Payment Failed' };
	}
};

export async function POST({ request, cookies }) {
	const datas = await request.json();
	console.log(datas);
	const { name, emailId, phoneNumber, eventId, childTicketNumber, AdultTicketNumber, pricePaid } =
		datas;
	const merchantTransactionId =
		'P' +
		Date.now().toString() +
		Math.random().toString(36).substring(2, 10) +
		Math.random().toString(36).substring(2, 10);

	const merchantUserId =
		name.replace(/\s/g, '').toUpperCase().substring(0, 5) +
		phoneNumber.toString().substring(0, 10) +
		eventId.toString() +
		Date.now().toString();


	bookingData.update((arr) => [
		...arr,
		{
			name: name,
			email: emailId,
			phoneNumber: phoneNumber,
			eventId: eventId,
			childTicketNumber: childTicketNumber,
			AdultTicketNumber: AdultTicketNumber,
			pricePaid: pricePaid,
			merchantTransactionId: merchantTransactionId,
            merchantUserId: merchantUserId
		}
	]);

	const { payloadMain, xVerify } = setPaymentData(
		merchantTransactionId,
		pricePaid,
		merchantUserId,
    phoneNumber
	);
	const { redirectUrl } = await paymentRequest(payloadMain, xVerify);

	return json({ redirect_url: redirectUrl });
}
