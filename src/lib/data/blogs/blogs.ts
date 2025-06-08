import type { Author, Blogs as BlogsType } from '$lib/types/types';

const author: Author = {
	name: 'Rajit Khosla',
	profilePicture: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
	href: '/',
	title: 'Senior Software Engineer'
};

export const Blogs: BlogsType = [
	{
		id: 'how-to-write-serverless-static-personnel-website',
		title: 'How to write serverless static personnal website',
		lead: 'Flowbite is an open-source library of UI components built with the utility-first classes from Tailwind CSS. It also includes interactive elements such as dropdowns, modals, datepickers.',
		author: { ...author },
		date: 'Jun. 6, 2025',
		isoDate: '2025-06-06',
		content: ''
	}
];
