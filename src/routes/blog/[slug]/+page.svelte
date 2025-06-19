<script>
	import { Section, BlogTemplate } from 'flowbite-svelte-blocks';
	const { data } = $props();
	const blog = data.blog;
</script>

<Section name="blog" sectionClass="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900">
	<article
		class="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mx-auto w-full max-w-2xl"
	>
		<BlogTemplate {blog} authorClass="w-8 h-8 abc" />
	</article>
</Section>
