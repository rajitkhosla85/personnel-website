<script lang="ts">
	import { BlogHead } from 'flowbite-svelte-blocks';
	const projects = [
		{
			name: 'My Serverless Staic Website',
			link: 'https://github.com/rajitkhosla85/books-marketplace',
			description:
				'Its a project which is built by using sveltekit and flowbite to create an personnel website'
		},
		{
			name: 'Books Marketplace',
			link: 'https://github.com/rajitkhosla85/books-marketplace',
			description:
				'Its books marketplace built on MERN(mongodb, Expressjs, React, Nodejs) where users can buy and sell their old and new books. Its an environment-friendly initiative which promotes reusability of books'
		},
		{
			name: 'Search Fight',
			link: 'https://github.com/rajitkhosla85/searchfight',
			description:
				'SearchFight is an command-line application designed to compare the number of search results returned by different search engines for given search terms ex Google, bing etc.'
		},
		{
			name: 'Car Rental Marketplace',
			link: 'https://github.com/rajitkhosla85/books-marketplace',
			description:
				'The Car Rental Application is a Java-based project designed to facilitate the process of renting cars. It provides functionalities for users to browse available vehicles, make reservations, and manage their bookings.'
		}
	];
</script>

<svelte:head>
	<title>Projects</title>
	<meta name="Projects" content="Github projects created by Rajit Khosla" />
</svelte:head>

<div class="mx-auto max-w-3xl px-4 py-8 font-sans">
	<BlogHead>
		{#snippet h2()}My Projects{/snippet}
	</BlogHead>

	{#each projects as project}
		<a
			href={project.link}
			target="_blank"
			rel="noopener noreferrer"
			class="fon text-xl font-semibold text-amber-600"
		>
			<div
				class="mb-6 rounded-2xl border border-amber-600 p-6 transition-shadow duration-200 hover:shadow-lg"
			>
				{project.name}
				<p class="mt-2 leading-relaxed text-gray-700">{project.description}</p>
			</div>
		</a>
	{/each}
</div>
