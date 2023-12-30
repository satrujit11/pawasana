import { error, json } from '@sveltejs/kit';
import db from '$lib/database';
import { s3Client } from '$lib/config/S3Config.js';
import { DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { authorize } from '$lib/config/SheetsAuth';
import { PUBLIC_S3_LINK } from '$env/static/public';

export async function GET(event) {
	try {
		const events = await db.event.findMany({
			orderBy: { createdAt: 'desc' }
		});
		event.setHeaders({
			'Cache-Control': 'public, max-age=0, s-maxage=60'
		});
		return json(events);
	} catch (err) {
		console.log(err);
		return error({
			status: 500,
			message: 'Internal Server Error'
		});
	}
}

export async function POST({ request, cookies }) {
	const datas = await request.json();
	const {
		name,
		description,
		event_type,
		area_and_street,
		city,
		state,
		Landmark,
		pincode,
		imageLinks,
		spreadSheetId,
		eventDate
	} = datas;

	if (
		!name ||
		!description ||
		!event_type ||
		!area_and_street ||
		!city ||
		!state ||
		!Landmark ||
		!pincode ||
		!imageLinks ||
		!eventDate
	) {
		return error({ message: 'Missing data' }, { status: 400 });
	}

	const pincodeInt = parseInt(pincode);
	const imageLinksString = imageLinks.join(',');
	try {
		await db.event.create({
			data: {
				name,
				description,
				event_type,
				area_and_street,
				city,
				state,
				Landmark,
				pincode: pincodeInt,
				imageLinks: imageLinksString,
				spreadSheetId,
				eventDate
			}
		});

		return json({ message: 'Event record created successfully' });
	} catch (err) {
		console.log(err);
		return error({
			status: 500,
			message: 'Internal Server Error'
		});
	}
}
const deleteSheet = async (spreadsheetId) => {
	const auth = await authorize();
	const driveResponse = await fetch(
		`https://www.googleapis.com/drive/v3/files/${spreadsheetId}`,
		{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${auth.access_token}`
			}
		}
	);
	if (!driveResponse.ok) {
		throw new Error(`Failed to grant write access. Status: ${driveResponse.status}`);
	}

	return spreadsheetId;
};

const deleteObjects = async (params) => {
	try {
		console.log(params);
		const data = await s3Client.send(new DeleteObjectsCommand(params));
		console.log('Successfully deleted objects: ' + params.Bucket + '/' + params.Key);
		return data;
	} catch (err) {
		console.log('Error', err);
	}
};

export async function DELETE({ request }) {
	const datas = await request.json();
	const { id, imageLinks, spreadSheetId } = datas;
	const imageNames = imageLinks.split(',').map((imageLink) => {
		const imageName = imageLink.replace(`${PUBLIC_S3_LINK}`, '');
		return { Key: imageName };
	});
	console.log(imageNames);

	const deleteParams = {
		Bucket: 'pawasana',
		Delete: {
			Objects: imageNames
		}
	};

	try {
		const result = await db.event.delete({
			where: {
				id: parseInt(id)
			}
		});
		if (result) {
			await deleteObjects(deleteParams);
			await deleteSheet(spreadSheetId);
			return json({ message: 'Adoption record deleted successfully' });
		} else {
			return error({
				status: 404,
				message: 'Adoption record not found'
			});
		}
	} catch (err) {
		console.log(err);
		return error({
			status: 500,
			message: 'Internal Server Error'
		});
	}
}
