import { error, json } from '@sveltejs/kit';
import db from '$lib/database';
import { authorize } from '$lib/config/SheetsAuth';
import crypto from 'crypto';

export async function GET() {
	try {
		const bookings = await db.booking.findMany();
		return json(bookings);
	} catch (err) {
		console.log(err);
		return error({
			status: 500,
			message: 'Internal Server Error'
		});
	}
}

const appendToSpreadsheet = async (spreadsheetId, values) => {
	const auth = await authorize();

	try {
		const range = 'Sheet1';
		const response = await fetch(
			`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.access_token}`
				},
				body: JSON.stringify({
					range: range,
					majorDimension: 'ROWS',
					values: [values]
				})
			}
		);

		if (!response.ok) {
			throw new Error(`Failed to append values. Status: ${response.status}`);
		}

		const responseData = await response.json();
		console.log('Values appended successfully:', responseData);
	} catch (error) {
		console.error('Error appending values to spreadsheet:', error);
		throw error;
	}
};

export async function POST({ request }) {
	const datas = await request.json();
	console.log(datas);
	const {
		name,
		emailId,
		phoneNumber,
		eventId,
		AdultTicketNumber,
		childTicketNumber,
		pricePaid,
		transactionNumber,
		merchantTransactionId,
		merchantUserId
	} = datas;
	if (
		!name ||
		!emailId ||
		!phoneNumber ||
		!eventId ||
		!AdultTicketNumber ||
		!childTicketNumber ||
		!pricePaid ||
		!transactionNumber ||
		!merchantTransactionId ||
		!merchantUserId
	) {
		return error({ message: 'Missing data' }, { status: 400 });
	}

	const event = await db.event.findUnique({
		where: { id: parseInt(eventId) }
	});
	const spreadSheetId = event.spreadSheetId;
	console.log(spreadSheetId);
	const arr_data = [
		name,
		emailId,
		phoneNumber,
		`${AdultTicketNumber}`,
		`${childTicketNumber}`,
		`${pricePaid}`,
		transactionNumber
	];

	console.log(arr_data);
	try {
		await appendToSpreadsheet(spreadSheetId, arr_data);
	} catch (err) {
		console.log(err);
		return error({
			status: 500,
			message: 'Internal Server Error'
		});
	}
	try {
		await db.booking.create({
			data: {
				name,
				emailId,
				phoneNumber,
				eventId: parseInt(eventId),
				AdultTicketNumber: parseInt(AdultTicketNumber),
				childTicketNumber: parseInt(childTicketNumber),
				pricePaid: parseFloat(pricePaid),
				transactionNumber,
				merchantTransactionId,
				merchantUserId
			}
		});

		return json({ status: 200, message: 'Booking record created successfully' });
	} catch (err) {
		console.log(err);
		return error({
			status: 500,
			message: 'Internal Server Error'
		});
	}
}

const refund = async (transactionNumber, merchantTransactionId, amount, merchantUserId) => {
	const payload = JSON.stringify({
		merchantId: 'PGTESTPAYUAT',
		merchantUserId: merchantUserId,
		merchantTransactionId: merchantTransactionId,
		originalTransactionId: transactionNumber,
		amount: amount,
		callbackUrl: `https://webhook.site/f57576c3-d5bb-473f-8626-7bd71b88500e`
	});

	const payloadMain = Buffer.from(payload).toString('base64');
	const saltkey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
	const saltIndex = 1;
	const string = payloadMain + '/pg/v1/refund' + saltkey;
	const sha256 = crypto.createHash('sha256').update(string).digest('hex');
	const xVerify = sha256 + '###' + saltIndex;
	console.log('payloadmain:', payloadMain);
	console.log('xverify:', xVerify);

	try {
		const response = await fetch(
			'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/refund',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-VERIFY': xVerify
				},
				body: JSON.stringify({
					request: payloadMain
				})
			}
		);
		const responseData = await response.json();
		// console.log('response data:', responseData);
		return responseData;
	} catch (err) {
		console.error(err);
		throw new Error('Refund request failed');
	}
};

const clearToSpreadsheet = async (spreadsheetId, rowNumber) => {
	const auth = await authorize();

	try {
		const range = `Sheet1!${rowNumber}:${rowNumber}`;
		console.log('Spreadsheet Range', range);
		const response = await fetch(
			`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:clear`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.access_token}`
				}
			}
		);
		const responseData = await response.json();
		console.log(responseData);
		if (!response.ok) {
			throw new Error(`Failed to append values. Status: ${response.status}`);
		}
	} catch (error) {
		console.error('Error appending values to spreadsheet:', error);
		throw error;
	}
};

export async function DELETE({ request }) {
	const datas = await request.json();
	console.log('data from server:', datas);
	const { email, phoneNumber, transactionId } = datas;

	if (!email || !phoneNumber || !transactionId) {
		console.error('Missing data:', datas);
		return error({ message: 'Missing data' }, { status: 400 });
	}

	try {
		const booking = await db.booking.findFirst({
			where: {
				emailId: email,
				phoneNumber: phoneNumber,
				transactionNumber: transactionId,
				refundStatus: false
			}
		});

		const event = await db.event.findFirst({
			where: {
				id: booking.eventId
			}
		});

		console.log('Event:', event);

		if (!booking) {
			console.error('Booking not found:', datas);
			return error({ message: 'Booking not found' }, { status: 404 });
		}

		await refund(
			booking.transactionNumber,
			booking.merchantTransactionId,
			booking.pricePaid.toString(),
			booking.merchantUserId
		);

		// if (!refundResponse) {
		// 	console.error('Refund failed:', refundResponse);
		// 	return error({ message: 'Refund failed' }, { status: 500 });
		// }

		// console.log('refundResponse:', refundResponse);

		// console.log('data from database:', booking);
		await db.booking.update({
			where: {
				id: booking.id
			},
			data: {
				refundStatus: true
			}
		});

		const spreadSheetresponse = await clearToSpreadsheet(event.spreadSheetId, booking.id + 1);
		const spreadSheetResponseJson = await spreadSheetresponse.json();

		console.log(spreadSheetResponseJson);
		// console.log('Booking refunded successfully');
		return {
			status: 200,
			message: 'Booking deleted successfully'
		};
	} catch (err) {
		console.error(err);
		return error({
			status: 500,
			message: 'Internal Server Error'
		});
	}
}
