import crypto from 'crypto';
import { bookingData } from '$lib/stores/bookingData';

let merchantTransactionId,
	name,
	emailId,
	phoneNumber,
	eventId,
	childTicketNumber,
	AdultTicketNumber,
	pricePaid,
    merchantUserId

const manageBookingData = async (transactionId) => {
	let bookingInfo;
	let filteredData;
	if (fetch) {
		const unsubscribe = bookingData.subscribe((value) => {
			bookingInfo = value;
		});

		filteredData = bookingInfo.filter(
			(item) => item.merchantTransactionId === merchantTransactionId
		);
		await Promise.resolve();
		unsubscribe();
	}
	name = filteredData[0].name;
	emailId = filteredData[0].email;
	phoneNumber = filteredData[0].phoneNumber;
	eventId = filteredData[0].eventId;
	AdultTicketNumber = filteredData[0].AdultTicketNumber;
	childTicketNumber = filteredData[0].childTicketNumber;
	pricePaid = filteredData[0].pricePaid;
    merchantUserId = filteredData[0].merchantUserId;

	const sending_data = {
		name: name,
		emailId: emailId,
		phoneNumber: phoneNumber,
		eventId: eventId,
		AdultTicketNumber: AdultTicketNumber,
		childTicketNumber: childTicketNumber,
		pricePaid: pricePaid,
		transactionNumber: transactionId,
		merchantTransactionId: merchantTransactionId,
        merchantUserId: merchantUserId
	};

	console.log('sending data', sending_data);
	try {
		const response = await fetch(`http://0.0.0.0:3000/api/booking`, {
			method: 'POST',
			body: JSON.stringify({
				name: name,
				emailId: emailId,
				phoneNumber: phoneNumber,
				eventId: eventId,
				AdultTicketNumber: AdultTicketNumber,
				childTicketNumber: childTicketNumber,
				pricePaid: pricePaid,
				transactionNumber: transactionId,
				merchantTransactionId: merchantTransactionId,
                merchantUserId: merchantUserId
			}),
			headers: {
				'content-type': 'application/json'
			}
		});
		const data = await response.json();
		if (data.status == 200) {
			bookingData.update((data) => {
				const newData = data.filter(
					(item) => item.merchantTransactionId !== merchantTransactionId
				);
				return newData;
			});
		}
	} catch (err) {
		console.log(err);
		console.log('Error from Here');
	}
};

export const load = async ({ params }) => {
	merchantTransactionId = params.merchantTransactionId;
	const merchantId = 'PGTESTPAYUAT';
	const saltkey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
	const saltIndex = 1;
	const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + saltkey;
	const sha256 = crypto.createHash('sha256').update(string).digest('hex');
	const xVerify = sha256 + '###' + saltIndex;

	let response;
	try {
		response = await fetch(
			`https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'X-VERIFY': xVerify,
					'X-MERCHANT-ID': merchantId
				}
			}
		);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		await manageBookingData(data.data.transactionId);
		return { data: data.code };
	} catch (err) {
		console.error('Error in fetch:', err);
		return { data: 'ERROR' };
	}
};
