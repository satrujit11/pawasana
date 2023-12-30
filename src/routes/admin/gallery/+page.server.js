import { s3Client } from '$lib/config/S3Config.js';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { extname } from 'path';
import { PUBLIC_WEBSITE_LINK, PUBLIC_S3_LINK } from '$env/static/public';
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
		const response = await fetch(`${PUBLIC_WEBSITE_LINK}/api/gallery`, {
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

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const uploadedFile = formData?.get('imageLink');

		if (uploadedFile.size > 0) {
			console.log(uploadedFile);
			filename = `${crypto.randomUUID()}${extname(uploadedFile?.name)}`;
			const fileContent = await uploadedFile.arrayBuffer();
			imageFile = Buffer.from(fileContent);
			console.log(imageFile);
			const params = {
				Bucket: 'pawasana-dev',
				Key: `gallery/${filename}`,
				Body: imageFile,
				ACL: 'public-read'
			};
			const data = {
				imageLink: `${ PUBLIC_S3_LINK}/gallery/${filename}`
			};
			try {
				await uploadObject(params);
			} catch (err) {
				return { error: err, status: 500 };
			}
			try {
				await handleSubmit(data);
			} catch (err) {
				return { error: err, status: 500 };
			}
			return { success: true };
		} else {
			return { error: 'No file added' };
		}
	}
};
