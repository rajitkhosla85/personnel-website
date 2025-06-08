export async function load({ fetch }) {
	const blogs = await (await fetch('/api/blogs')).json();
	return {
		blogs
	};
}
