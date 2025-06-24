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
			<h1 class="text-center text-2xl font-extrabold">Rajit Khosla</h1>
		</header>
	</Animate>
	<Animate variant="fade" duration={2} delay={0.2}>
		<section class="px-4 py-6 text-left text-lg sm:text-xl" aria-labelledby="about-me-heading">
			<h3 id="about-me-heading" class="pb-2 text-center text-xl font-extrabold">About Me</h3>
			<p>
				I'm a seasoned IT professional with over <strong>18 years</strong> of diverse experience in
				the software industry. Currently, I work as a
				<strong>Software Engineer at Schibsted</strong>, where I’ve taken on various roles such as
				<strong>Solution Architect</strong>, <strong>Technical Lead</strong>, and
				<strong>Software Developer</strong>. Throughout my career, I've delivered robust, scalable,
				and high-performance solutions across multiple domains.
			</p>

			<p class="pt-2">
				My expertise spans a wide range of technologies, system architectures, and development
				methodologies. I'm deeply passionate about <em>clean code</em>, <em>system design</em>, and
				fostering <em>technical excellence</em>. I take pride in being both a hands-on engineer and
				a strategic thinker who bridges business goals with smart technical solutions.
			</p>

			<p class="pt-2">
				Outside of work, I’m an avid learner and tennis enthusiast. I enjoy staying current with the
				latest in tech—whether that’s exploring new frameworks, experimenting with tools, or reading
				about architecture and engineering principles.
				<em>Continuous learning</em> is what drives me.
			</p>

			<p class="pt-2">Feel free to explore my personal projects and blog posts below:</p>

			<div class="mt-6 flex flex-col justify-center gap-4 text-center sm:flex-row">
				<a href="/projects" class="rounded-full bg-amber-500 px-6 py-2 text-white sm:w-full">
					View Projects
				</a>

				<a
					href="/blogs"
					class="inline-block rounded-full border border-amber-500 px-6 py-2 text-amber-500 sm:w-full"
				>
					View Blogs
				</a>

				<button
					class="rounded-full bg-amber-500 px-6 py-2 text-white sm:w-full"
					onclick={() => (openContact = true)}
				>
					Contact Me
				</button>
			</div>
			<ContactModal bind:open={openContact} />
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
