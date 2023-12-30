import { error, json } from '@sveltejs/kit';
import db from '$lib/database';
import { s3Client } from '$lib/config/S3Config.js';
import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { PUBLIC_S3_LINK } from '$env/static/public';

export async function GET(event) {
	try {
		const adoptions = await db.adoption.findMany({
			orderBy: { createdAt: 'desc' }
		});
		event.setHeaders({
			'Cache-Control': 'public, max-age=0, s-maxage=60'
		});
		return json(adoptions);
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
	const { name, sex, age, description, tags, imageLink, state } = datas;
	const ageInt = parseInt(age);
	if (!name || !sex || !age || !description || !tags || !imageLink || !state) {
		return json({ message: 'Missing data' }, { status: 400 });
	}

	try {
		await db.adoption.create({
			data: {
				name,
				sex,
				age: ageInt,
				description,
				tags,
				imageLink,
				state
			}
		});
		return json({ message: 'Adoption record created successfully' });
	} catch (err) {
		console.log(err);
		return error({
			status: 500,
			message: 'Internal Server Error'
		});
	}
}

const deleteObject = async (params) => {
	try {
		console.log(params);
		const data = await s3Client.send(new DeleteObjectCommand(params));
		console.log('Successfully deleted object: ' + params.Bucket + '/' + params.Key);
		return data;
	} catch (err) {
		console.log('Error', err);
	}
};

export async function DELETE({ request }) {
	const datas = await request.json();
	const { id, imageLink } = datas;
    const imageName = imageLink.replace(PUBLIC_S3_LINK, '');
	const deleteParams = {
		Bucket: 'pawasana',
		Key: imageName
	};
	try {
		const result = await db.adoption.delete({
			where: {
				id: parseInt(id)
			}
		});

		if (result) {
	        await deleteObject(deleteParams);
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
