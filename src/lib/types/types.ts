export type Blogs = Array<Blog>;
export type Blog = {
	id: string;
	title: string;
	lead: string;
	author: Author;
	date: string;
	isoDate: string;
	content: string;
	/** When set, the blog lives on another site and the list links straight to it. */
	externalUrl?: string;
};
export type Author = {
	name: string;
	profilePicture: string;
	title: string;
	href?: string;
};
