import { error, json } from '@sveltejs/kit';
import bookingData from '$lib/stores/bookingData';
import crypto from 'crypto';

const setPaymentData = (merchantTransactionId, amount) => {
	const payload = JSON.stringify({
		merchantId: 'PGTESTPAYUAT',
		merchantTransactionId: merchantTransactionId,
		merchantUserId: 'MUID123',
		amount: amount,
		redirectUrl: 'http://localhost:5173/payment',
		redirectMode: 'REDIRECT',
		mobileNumber: '9999999999',
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
    }
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
	if (data.success) {
		const redirectUrl = data.data.instrumentResponse.redirectInfo.url;
		return { redirectUrl: redirectUrl };
	} else {
		console.log(data);
		return { message: 'Payment Failed' };
	}
};

export async function POST({ request }) {
	const datas = await request.json();
	console.log(datas);
	const { name, emailId, phoneNumber, eventId, childTicketNumber, AdultTicketNumber, pricePaid } =
		datas;
	const merchantTransactionId =
		'P' +
		Date.now().toString() +
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15);
	bookingData.set({
		name: name,
		email: emailId,
		phoneNumber: phoneNumber,
		eventId: eventId,
		childTicketNumber: childTicketNumber,
		AdultTicketNumber: AdultTicketNumber,
		pricePaid: pricePaid,
		merchantTransactionId: merchantTransactionId
	});
    const { payloadMain, xVerify } = setPaymentData(merchantTransactionId, pricePaid);
    const { redirectUrl } = await paymentRequest(payloadMain, xVerify);

	return json({ redirect_url: redirectUrl });
}