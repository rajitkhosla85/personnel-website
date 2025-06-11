<script lang="ts">
	import {
		Section,
		ArticleAuthor,
		ArticleBody,
		ArticleHead,
		ArticleWrapper,
		BlogHead,
		BlogBodyWrapper
	} from 'flowbite-svelte-blocks';
	import { VideoCameraSolid, ArrowRightOutline, NewspaperSolid } from 'flowbite-svelte-icons';
	const { data } = $props();
	const calculateDateDifferenceFromISODate = (isoDate: string) => {
		const date = new Date(isoDate).getMilliseconds();
		const now = new Date().getMilliseconds();
		const diffTime = Math.abs(now - date);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays > 1 ? `${diffDays} Days ago` : `${diffDays} Day ago`;
	};
</script>

<Section name="blog">
	<BlogHead>
		{#snippet h2()}My Blogs{/snippet}
	</BlogHead>
	<BlogBodyWrapper>
		{#each data.blogs as blog}
			<ArticleWrapper class="border-amber-500 ">
				<ArticleHead>
					<span
						class="bg-primary-100 text-primary-800 dark:bg-primary-200 dark:text-primary-800 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium"
					>
						<NewspaperSolid size="xs" class="mr-1" />
						Article
					</span>
					<span class="text-sm">{calculateDateDifferenceFromISODate(blog.isoDate)}</span>
				</ArticleHead>
				<ArticleBody>
					{#snippet h2()}<a href="/blog/{blog.id}">{blog.title}</a>{/snippet}
					{#snippet paragraph()}
						<p class="mb-5 font-light text-gray-500 dark:text-gray-400">
							{blog.lead}
						</p>
					{/snippet}
				</ArticleBody>
				<ArticleAuthor>
					<a
						href="/blog/{blog.id}"
						class="text-primary-600 dark:text-primary-500 inline-flex items-center font-medium hover:underline"
					>
						Read more
						<ArrowRightOutline size="sm" class="ml-2" />
					</a>
				</ArticleAuthor>
			</ArticleWrapper>
		{/each}
		<!--<ArticleWrapper>
			<ArticleHead>
				<span
					class="bg-primary-100 text-primary-800 dark:bg-primary-200 dark:text-primary-800 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium"
				>
					<VideoCameraSolid size="xs" class="mr-1" />
					Tutorial
				</span>
				<span class="text-sm">14 days ago</span>
			</ArticleHead>
            
			<ArticleBody>
				{#snippet h2()}<a href="/">How to quickly deploy a static website</a>{/snippet}
				{#snippet paragraph()}
					<p class="mb-5 font-light text-gray-500 dark:text-gray-400">
						Static websites are now used to bootstrap lots of websites and are becoming the basis
						for a variety of tools that even influence both web designers and developers influence
						both web designers and developers.
					</p>
				{/snippet}
			</ArticleBody>
			<ArticleAuthor>
				{#snippet author()}
					<img
						class="h-7 w-7 rounded-full"
						src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
						alt="Jese Leos avatar"
					/>
					<span class="font-medium dark:text-white"> Jese Leos </span>
				{/snippet}
				<a
					href="/"
					class="text-primary-600 dark:text-primary-500 inline-flex items-center font-medium hover:underline"
				>
					Read more
					<ArrowRightOutline size="sm" class="ml-2" />
				</a>zz
			</ArticleAuthor>
		</ArticleWrapper> -->
	</BlogBodyWrapper>
</Section>
