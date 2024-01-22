import { extname } from 'path';
import { s3Client } from '$lib/config/S3Config.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { authorize } from '$lib/config/SheetsAuth';
import { auth } from '$lib/stores/authStore';
import { redirect } from '@sveltejs/kit';
import { PUBLIC_S3_LINK} from '$env/static/public';

export const load = () => {
    let authStatus = false;
    const unsubscribe = auth.subscribe((value) => {
        console.log(value);
        authStatus = value;
    })
    console.log(authStatus);
    unsubscribe();
    if (!authStatus) {
        throw redirect(302, '/');
    }
}

let fileNames;

const uploadObject = async (params) => {
	try {
		console.log(params);
		const data = await s3Client.send(new PutObjectCommand(params));
		console.log('Successfully uploaded object: ' + params.Bucket + '/' + params.Key);
		return data;
	} catch (err) {
		console.log('Error', err);
	}
};

const handleSubmit = async (params) => {
	console.log(JSON.stringify(params));
	try {
		const response = await fetch(`http://0.0.0.0:3000/api/event`, {
			method: 'POST',
			body: JSON.stringify(params),
			headers: {
				'content-type': 'application/json'
			}
		});
		const data = await response.json();
		console.log(data);
	} catch (err) {
		console.log(err);
	}
};

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

const createSpreadsheet = async (name) => {
	const auth = await authorize();

	try {
		// Step 1: Create the spreadsheet using the Sheets API
		const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${auth.access_token}`
			},
			body: JSON.stringify({
				properties: {
					title: name
				}
			})
		});

		if (!response.ok) {
			throw new Error(`Failed to create spreadsheet. Status: ${response.status}`);
		}

		const responseData = await response.json();
		const spreadsheetId = responseData.spreadsheetId;
		// Step 2: Add permission for another email with write access using the Drive API
		const userEmail = 'yogaforacause@pawasana.in'; // Replace with the actual email
		const driveResponse = await fetch(
			`https://www.googleapis.com/drive/v3/files/${spreadsheetId}/permissions`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.access_token}`
				},
				body: JSON.stringify({
					role: 'reader', // 'writer' role provides write access
					type: 'user',
					emailAddress: userEmail
				})
			}
		);
		if (!driveResponse.ok) {
			throw new Error(`Failed to grant write access. Status: ${driveResponse.status}`);
		}

		return spreadsheetId;
	} catch (error) {
		console.error('Error creating spreadsheet:', error);
		throw error;
	}
};

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const uploadedFiles = Array.from(formData?.getAll('imageLinks'));
		const validFiles = uploadedFiles.filter((file) => file.size > 0);
		if (validFiles.length === 0) {
			return { error: 'No file added' };
		}
		fileNames = await Promise.all(
			uploadedFiles.map(async (uploadedFile) => {
				const filename = `${crypto.randomUUID()}${extname(uploadedFile.name)}`;
				const fileContent = await uploadedFile.arrayBuffer();
				const imageFile = Buffer.from(fileContent);

				const params = {
					Bucket: 'pawasana-dev',
					Key: `events/${filename}`,
					Body: imageFile,
					ACL: 'public-read'
				};

				await uploadObject(params);

				return `${PUBLIC_S3_LINK}/events/${filename}`;
			})
		);

		const spreadSheetId = await createSpreadsheet(formData?.get('name'));
		const array = [
			'Name',
			'Email',
			'Phone Number',
			'Number of Adult Tickets',
			'Number of Child tickets',
			'Price Paid',
			'Transaction Number'
		];
		await appendToSpreadsheet(spreadSheetId, array);
        const eventDate = new Date(formData?.get('eventDate'));
		const data = {
			name: formData?.get('name'),
			description: formData?.get('description'),
			event_type: formData?.get('eventType'),
			area_and_street: formData?.get('areaAndStreet'),
			city: formData?.get('city'),
			state: formData?.get('state'),
			Landmark: formData?.get('state'),
			pincode: formData?.get('pincode'),
			imageLinks: fileNames,
			spreadSheetId: spreadSheetId,
            eventDate: eventDate
		};
		await handleSubmit(data);
		return { success: true };
	}
};
