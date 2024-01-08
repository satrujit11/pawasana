import { extname } from 'path';
import { s3Client } from '$lib/config/S3Config.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { PUBLIC_S3_LINK } from '$env/static/public';
import { auth } from '$lib/stores/authStore';
import { redirect } from '@sveltejs/kit';

export const load = () => {
    let authStatus = false;
    const unsubscribe = auth.subscribe((value) => {
        authStatus = value;
    })

    unsubscribe();
    if (!authStatus) {
        throw redirect(302, '/');
    }
}

let imageFile, filename;

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
		const response = await fetch(`http://0.0.0.0:3000/api/adoption`, {
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

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const uploadedFile = formData?.get('imageLink');
		console.log();
		if (uploadedFile.size > 0) {
			filename = `${crypto.randomUUID()}${extname(uploadedFile?.name)}`;
			const fileContent = await uploadedFile.arrayBuffer();
			imageFile = Buffer.from(fileContent);

			const params = {
				Bucket: 'pawasana-dev',
				Key: `adoptions/${filename}`,
				Body: imageFile,
				ACL: 'public-read'
			};

			await uploadObject(params);

			const data = {
				name: formData?.get('name'),
				sex: formData?.get('sex'),
				age: formData?.get('age'),
				description: formData?.get('description'),
				tags: formData?.get('tags'),
				imageLink: `${ PUBLIC_S3_LINK}/adoptions/${filename}`,
                state: formData?.get('state')
			};

			await handleSubmit(data);

			return { success: true };
		} else {
			return { error: 'No file added' };
		}
	}
};
