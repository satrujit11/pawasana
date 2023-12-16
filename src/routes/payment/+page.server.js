import crypto from 'crypto';
import bookingData from '$lib/stores/bookingData';

let merchantTransactionId,
	name,
	emailId,
	phoneNumber,
	eventId,
	childTicketNumber,
	AdultTicketNumber,
	pricePaid;

const manageBookingData = async (transactionId) => {
	bookingData.subscribe((bookingData) => {
		name = bookingData.name;
		emailId = bookingData.email;
		phoneNumber = bookingData.phoneNumber;
        eventId = bookingData.eventId;
		AdultTicketNumber = bookingData.AdultTicketNumber;
		childTicketNumber = bookingData.childTicketNumber;
		pricePaid = bookingData.pricePaid;
	});
    const sending_data = {
				name: name,
				emailId: emailId,
				phoneNumber: phoneNumber,
                eventId: eventId,
				AdultTicketNumber: AdultTicketNumber,
				childTicketNumber: childTicketNumber,
				pricePaid: pricePaid,
				transactionNumber: transactionId,
				merchantTransactionId: merchantTransactionId
    }

    console.log("sending data", sending_data);
	try {
		const response = await fetch('http://localhost:5173/api/booking', {
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
				merchantTransactionId: merchantTransactionId
			}),
			headers: {
				'content-type': 'application/json'
			}
		});
		await response.json();
	} catch (err) {
		console.log(err);
        console.log("Error from Here");
	}
};

export const load = async () => {
	let response;

	bookingData.subscribe((bookingData) => {
		merchantTransactionId = bookingData.merchantTransactionId;
	});

	const merchantId = 'PGTESTPAYUAT';
	const saltkey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
	const saltIndex = 1;
	const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + saltkey;
	const sha256 = crypto.createHash('sha256').update(string).digest('hex');
	const xVerify = sha256 + '###' + saltIndex;

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

	const data = await response.json();
	await manageBookingData(data.data.transactionId);
	return { data: data.code };
};
