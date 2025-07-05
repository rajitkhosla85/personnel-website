import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { json } from '@sveltejs/kit';
const bucketName = 'rk-personnel-website-contact-form';
type ContactFormEvent = {
	first_name: string;
	last_name: string;
	email: string;
	comment?: string;
};
const client = new S3Client({
	region: 'eu-north-1' // e.g., 'us-west-1'
});
export const handler = async (event: ContactFormEvent) => {
	try {
		// Extract data from form
		const { first_name, last_name, email, comment } = event;

		// Here you can add logic to store the form data in a database or send an email, etc.
		console.log('Form data1:', first_name, last_name, email, comment);
		const key: string = Date.now().toString();

		const command = new PutObjectCommand({
			Bucket: bucketName,
			Key: key,
			Body: JSON.stringify(event)
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
function uuidv4() {
	throw new Error('Function not implemented.');
}
