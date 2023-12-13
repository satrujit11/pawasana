
import { error, json } from '@sveltejs/kit';
import db from '$lib/database';

export async function GET(event) {
	try {
		const events = await db.event.findMany({
            orderBy: {createdAt: 'desc'}
        });
        event.setHeaders({
            'Cache-Control': 'public, max-age=0, s-maxage=60'
        })
        console.log(event)
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
	const { name, sex, age, description, tags, imageLink } = datas;
	const ageInt = parseInt(age);
	if (!name || !sex || !age || !description || !tags || !imageLink) {
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
				imageLink
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
