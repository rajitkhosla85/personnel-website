<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { cubicOut, cubicIn } from 'svelte/easing';

	let darkMode = false;
	let loaded = false;

	// Helper to create a tweened opacity/translateY store per element
	function createAnimation() {
		return {
			opacity: new Tween(0, { duration: 600, easing: cubicOut }),
			translateY: new Tween(20, { duration: 600, easing: cubicOut }),
			observer: null as IntersectionObserver | null,
			element: null as HTMLElement | null,
			setup(element: HTMLElement) {
				this.element = element;
				this.observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							console.log('entry', entry);
							if (entry.isIntersecting) {
								this.opacity.set(100);
								this.translateY.set(10);
							} else {
								this.opacity.set(0);
								this.translateY.set(20);
							}
						});
					},
					{ threshold: 0.1 }
				);
				this.observer.observe(element);
			},
			destroy() {
				if (this.observer && this.element) {
					this.observer.unobserve(this.element);
				}
			}
		};
	}

	// Create animations for sections
	const headerAnim = createAnimation();
	const heroAnim = createAnimation();
	const aboutAnim = createAnimation();

	onMount(() => {
		const stored = localStorage.getItem('darkMode');
		darkMode = stored === 'true';
		document.documentElement.classList.toggle('dark', darkMode);
		loaded = true;
	});

	function toggleDarkMode() {
		darkMode = !darkMode;
		localStorage.setItem('darkMode', String(darkMode));
		document.documentElement.classList.toggle('dark', darkMode);
	}
</script>

<main class="min-h-screen bg-white p-4 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
	{#if loaded}
		<!-- Header -->
		<header
			bind:this={headerAnim.element}
			class="flex flex-col items-center justify-between gap-4 py-4 sm:flex-row sm:gap-0"
			style="opacity: {headerAnim.opacity}; transform: translateY({headerAnim.translateY}px); transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1), transform 0.6s cubic-bezier(0.55, 0, 0.1, 1);"
			on:introstart={() => headerAnim.setup(headerAnim.element as unknown as HTMLElement)}
			on:destroy={() => headerAnim.destroy()}
		>
			<h1 class="text-center text-2xl font-bold sm:text-left">Your Name</h1>
			<button
				on:click={toggleDarkMode}
				class="rounded-full bg-amber-200 px-4 py-2 text-gray-900 dark:bg-amber-700 dark:text-gray-100"
			>
				{darkMode ? 'Light Mode' : 'Dark Mode'}
			</button>
		</header>

		<!-- Hero Section -->
		<section
			bind:this={heroAnim.element}
			class="px-4 py-12 text-center"
			style="opacity: {heroAnim.opacity}; transform: translateY({heroAnim.translateY}px); transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1), transform 0.6s cubic-bezier(0.55, 0, 0.1, 1);"
			on:introstart={() => heroAnim.setup(heroAnim.element as unknown as HTMLElement)}
			on:destroy={() => heroAnim.destroy()}
		>
			<h2 class="mb-2 text-4xl font-extrabold sm:text-5xl">Hi, I'm Your Name</h2>
			<p class="text-lg sm:text-xl">Senior Software Engineer | Svelte Enthusiast</p>
			<div class="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
				<a href="#projects" class="rounded-full bg-amber-500 px-6 py-2 text-white">View Projects</a>
				<a
					href="mailto:you@example.com"
					class="rounded-full border border-amber-500 px-6 py-2 text-amber-500">Contact Me</a
				>
			</div>
		</section>

		<!-- About Section -->
		<section
			id="about"
			bind:this={aboutAnim.element}
			class="mx-auto max-w-3xl px-4 py-12"
			style="opacity: {aboutAnim.opacity}; transform: translateY({aboutAnim.translateY}px); transition: opacity 0.6s cubic-bezier(0.55, 0, 0.1, 1), transform 0.6s cubic-bezier(0.55, 0, 0.1, 1);"
			on:introstart={() => aboutAnim.setup(aboutAnim.element as unknown as HTMLElement)}
			on:destroy={() => aboutAnim.destroy()}
		>
			<h3 class="mb-4 text-2xl font-semibold">About Me</h3>
			<p>
				I'm a senior engineer specializing in full-stack development, with experience building
				scalable systems and rich web interfaces. Passionate about Svelte, developer experience, and
				shipping quality code.
			</p>
		</section>
	{/if}
</main>

<style global>
	html {
		font-family: system-ui, sans-serif;
	}
</style>
