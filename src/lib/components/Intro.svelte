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
	<header class="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row sm:gap-0">
		<h1 class="text-center text-2xl font-bold sm:text-left">Rajit Khosla</h1>
	</header>

	<section class="px-4 py-12 text-center">
		<h2 class="mb-2 text-4xl font-extrabold sm:text-5xl">Hi, I'm Rajit Khosla</h2>
		<p class="text-lg sm:text-xl">Senior Software Engineer | Svelte Enthusiast</p>
		<p class="sm:text-l text-lg">
			Hi I am Rajit Khosla working at Schibsted having an experience of 18 years. I am learner,
			creator and like to have fun working environment
		</p>
		<div class="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
			<a href="/projects" class="rounded-full bg-amber-500 px-6 py-2 text-white">View Projects</a>
			<button
				class="rounded-full border border-amber-500 px-6 py-2 text-amber-500"
				onclick={() => {
					openContact = true;
				}}
				>Contact Me
			</button>
			<ContactModal bind:open={openContact} />
		</div>
	</section>

	<section class="px-4 py-12 text-center">
		<h3 class="mb-2 text-4xl font-extrabold sm:text-5xl">Certification</h3>

		<Certifcations />
	</section>
	<section class="px-4 py-12 text-center">
		<h3 class="mb-2 text-4xl font-extrabold sm:text-5xl">Skills</h3>

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
