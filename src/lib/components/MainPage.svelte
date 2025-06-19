<script lang="ts">
	import Animate from './Animate.svelte';
	import Certifcations from './Certifcation.svelte';
	import ContactModal from './ContactModal.svelte';
	import Skills from './Skills.svelte';
	let openContact = $state(false);
</script>

<!--
<section>

	<div class="container">
		<div class="heading">
			<Animate variant="left"><h1>LEFT</h1></Animate>
			<Animate variant="fade"><h1>AND</h1></Animate>
			<Animate variant="right"><h1>RIGHT</h1></Animate>
		</div>
		<div class="boxes-row">
			<Animate variant="left" duraiton={1} delay={0}><div class="box"></div></Animate>
			<Animate variant="right" duraiton={1} delay={0}><div class="box"></div></Animate>
			<Animate variant="left" duration={1.5} delay={0.2}><div class="box"></div></Animate>
			<Animate variant="right" duration={1.5} delay={0.2}><div class="box"></div></Animate>
			<Animate variant="left" duration={2} delay={0.4}><div class="box"></div></Animate>
			<Animate variant="right" duration={2} delay={0.4}><div class="box"></div></Animate>
		</div>
	</div>
</section>
	-->
<main
	class="min-h-screen bg-white p-4 font-sans text-gray-900 transition-colors duration-300 sm:p-6 md:p-12 dark:bg-gray-900 dark:text-gray-100"
>
	<Animate variant="fade" duration={1} delay={0}>
		<header class="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row sm:gap-0">
			<h1 class="text-center text-2xl font-bold sm:text-left">Rajit Khosla</h1>
		</header>
	</Animate>
	<Animate variant="fade" duration={2} delay={0.2}>
		<section class="px-4 py-12 text-center text-lg sm:text-xl">
			<h2>About Me</h2>
			<p class="p-2">
				I am a seasoned IT professional with over <strong>18 years</strong> of diverse experience in
				the software industry, currently working as a
				<strong>Software Engineer at Schibsted</strong>. Over the years, I have taken on a variety
				of roles including <strong>Solution Architect</strong>, <strong>Technical Lead</strong>, and
				<strong>Software Developer</strong>, delivering robust, scalable, and high-performance
				solutions across different domains.
			</p>
			<p class="p-2">
				My experience spans a wide range of technologies, development methodologies, and system
				architectures. I’m passionate about <em>clean code</em>, <em>system design</em>, and driving
				<em>technical excellence</em>. I take pride in being both a hands-on developer and a
				strategic thinker who connects business needs with effective technical solutions.
			</p>
			<p class="p-2">
				Outside of work, I enjoy learning and playing tennis and staying up to date with the latest
				in technology. Whether it’s exploring new frameworks, experimenting with tools, or reading
				about system architecture, <em>continuous learning</em> is at the heart of what I do.
			</p>
			<p class="p-2">You can have a look at below personnel projects and blogs</p>
			<div class="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
				<a href="/projects" class="rounded-full bg-amber-500 px-6 py-2 text-white sm:w-full">
					View Projects</a
				>

				<a
					href="/blogs"
					class="inline-block rounded-full border border-amber-500 px-6 py-2 text-amber-500 sm:w-full"
				>
					View Blogs
				</a>

				<a
					href="/"
					class="rounded-full bg-amber-500 px-6 py-2 text-white sm:w-full"
					onclick={(event) => {
						event.preventDefault();
						openContact = true;
					}}
				>
					Contact Me
				</a>
				<ContactModal bind:open={openContact} />
			</div>
		</section>
	</Animate>

	<section class="px-4 py-12 text-center">
		<Animate variant="fade" duration={1.2} delay={0.2}>
			<h3 class="mb-2 text-4xl font-extrabold sm:text-5xl">Certification</h3>
		</Animate>
		<Certifcations />
	</section>
	<section class="px-4 py-12 text-center">
		<Animate variant="fade" duration={1.2} delay={0.2}>
			<h3 class="mb-2 text-4xl font-extrabold sm:text-5xl">Skills</h3>
		</Animate>
		<div class="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
			<Skills />
		</div>
	</section>
</main>

<style global>
	html {
		font-family: system-ui, sans-serif;
	}
</style>
