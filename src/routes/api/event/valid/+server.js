import { error, json } from '@sveltejs/kit';
import db from '$lib/database';

export async function GET(event) {
	try {
		const events = await db.event.findMany({
            where: {
                eventDate: {
                    gte: new Date()
                }
            },
			orderBy: { createdAt: 'desc' },
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
