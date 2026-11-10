import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getBlogs } from '$lib/data/blogs/blogs.ts';

export const GET: RequestHandler = async ({ fetch }) => {
	try {
		return json(await getBlogs(fetch));
	} catch (error) {
		console.error('Error handling form submission:', error);
		return json({ success: false }, { status: 500 });
	}
};
export const prerender = true;
