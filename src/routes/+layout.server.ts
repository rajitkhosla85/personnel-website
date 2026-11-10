type Nav = {
	displayName: string;
	path: string;
};
const navs: Array<Nav> = [
	{ displayName: 'HOME', path: 'home' },
	// { displayName: 'PROJECTS', path: 'projects' }, // hidden for now
	{ displayName: 'BLOGS', path: 'blogs' }
];
export function load() {
	return {
		navs
	};
}

export const prerender = true;
