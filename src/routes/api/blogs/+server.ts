import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Blogs } from '$lib/data/blogs/blogs.ts';

export const GET: RequestHandler = async () => {
	try {
		return json(Blogs);
	} catch (error) {
		console.error('Error handling form submission:', error);
		return json({ success: false }, { status: 500 });
	}
};
