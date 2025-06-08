import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const POST: RequestHandler = async ({ request }) => {
	try {
		// Parse the incoming JSON body
		const formData = await request.json();

		// Extract data from form
		const { first_name, last_name, email, comment } = formData;

		// Here you can add logic to store the form data in a database or send an email, etc.
		console.log('Form data1:', first_name, last_name, email, comment);

		// Respond with a success message
		return json({ success: true }, { status: 200 });
	} catch (error) {
		console.error('Error handling form submission:', error);
		return json({ success: false }, { status: 500 });
	}
};
