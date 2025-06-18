import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
const bucketName = 'rk-personnel-website-contact-form';
const client = new S3Client({
	region: 'eu-north-1', // e.g., 'us-west-1'
	credentials: {
		accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID || '',
		secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY || ''
	}
});

export const POST: RequestHandler = async ({ request }) => {
	try {
		// Parse the incoming JSON body
		const formData = await request.json();

		// Extract data from form
		const { first_name, last_name, email, comment } = formData;
		console.log('formdata', formData);

		// Here you can add logic to store the form data in a database or send an email, etc.
		console.log('Form data1:', first_name, last_name, email, comment);
		const key = uuidv4();

		const command = new PutObjectCommand({
			Bucket: bucketName,
			Key: key,
			Body: JSON.stringify(formData)
		});

		const response = await client.send(command);
		console.log(response);
		// Respond with a success message
		return json({ success: true }, { status: 200 });
	} catch (error) {
		console.error('Error handling form submission:', error);
		return json({ success: false }, { status: 500 });
	}
};
export const prerender = false;
