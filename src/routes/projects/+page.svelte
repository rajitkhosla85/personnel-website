<script lang="ts">
	import Animate from '$lib/components/Animate.svelte';
	import { BlogHead } from 'flowbite-svelte-blocks';
	import { GithubSolid } from 'flowbite-svelte-icons';
	const projects = [
		{
			name: 'My Serverless Static Website',
			link: 'https://github.com/rajitkhosla85/books-marketplace',
			description:
				'Its a project which is built by using sveltekit and flowbite to create an personnel website. It is hosted on netlify'
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

<div class="mx-auto max-w-3xl px-4 py-8 font-sans">
	<BlogHead>
		{#snippet h2()}My Projects{/snippet}
	</BlogHead>

	{#each projects as project}
		<Animate variant="fade" duration={2} delay={0}>
			<a
				href={project.link}
				target="_blank"
				rel="noopener noreferrer"
				class="font text-xl font-semibold text-amber-600 dark:bg-gray-900 dark:text-gray-100"
			>
				<div
					class="mb-6 rounded-2xl border border-amber-600 p-6 transition-shadow duration-200 hover:shadow-lg"
				>
					<div class="mb-2 flex items-center justify-between">
						<div class="underline">
							{project.name}
						</div>
						<div class="text-primary-600 dark:text-primary-500 font-medium hover:underline">
							<GithubSolid size="sm" />
						</div>
					</div>
					<p class="mt-2 leading-relaxed text-gray-700 dark:text-gray-400">{project.description}</p>
				</div>
			</a>
		</Animate>
	{/each}
</div>
