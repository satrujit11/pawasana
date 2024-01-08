import { error, json } from '@sveltejs/kit';
import db from '$lib/database';

export async function GET(event) {
	try {
		const galleries = await db.image.findMany({
			orderBy: { createdAt: 'desc' },
			take: 6
		});
		event.setHeaders({
			'Cache-Control': 'public, max-age=0, s-maxage=1200'
		});
		return json(galleries);
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
	const { imageLink } = datas;
	if (!imageLink) {
		return json({ message: 'Missing data' }, { status: 400 });
	}

	try {
		await db.image.create({
			data: {
				imageLink
			}
		});
		return json({ message: 'Gallery created successfully' });
	} catch (err) {
		console.log(err);
		return error({
			status: 500,
			message: 'Internal Server Error'
		});
	}
}
