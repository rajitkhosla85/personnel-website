import { dev } from '$app/environment';
type Nav = {
	displayName: string;
	path: string;
};
const navs: Array<Nav> = [
	{ displayName: 'HOME', path: 'home' },
	{ displayName: 'PROJECTS', path: 'projects' },
	{ displayName: 'BLOGS', path: 'blogs' }
];
export function load() {
	return {
		navs
	};
}

export const prerender = true;

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
export const csr = dev;
