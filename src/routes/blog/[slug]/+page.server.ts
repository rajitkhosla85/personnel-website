import type { Blogs } from '$lib/types/types';
import { error } from '@sveltejs/kit';
export const load = async ({ params, fetch }) => {
	const response = await fetch('/api/blogs');
	const blogs: Blogs = await response.json();
	const currentBlog = blogs.find((blog) => blog.id === params.slug);
	if (!currentBlog) {
		error(404, 'Blog not found');
	}
	return {
		blog: currentBlog
	};
};
