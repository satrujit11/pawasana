import { error, json } from '@sveltejs/kit';
import db from '$lib/database';
import { authorize } from '$lib/config/SheetsAuth';

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
					values: [values],
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
    console.log(datas)
	const {
		name,
		emailId,
		phoneNumber,
		eventId,
		AdultTicketNumber,
		childTicketNumber,
		pricePaid,
		transactionNumber,
        merchantTransactionId
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
        !merchantTransactionId
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

    console.log(arr_data)
	try {
		await appendToSpreadsheet(spreadSheetId, arr_data);
	} catch (err) {
		console.log(err);
        return error({
            status: 500,
            message: 'Internal Server Error'
        })
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
                merchantTransactionId
			}
		});

		return json({ message: 'Booking record created successfully', link:'https://www.google.com' });
	} catch (err) {
		console.log(err);
		return error({
			status: 500,
			message: 'Internal Server Error'
		});
	}
}
