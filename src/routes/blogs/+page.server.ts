import type { Blogs } from '$lib/types/types.js';

export async function load({ fetch }) {
	const blogs = (await (await fetch('/api/blogs')).json()) as Blogs;
	return {
		blogs
	};
}
