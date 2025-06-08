<script lang="ts">
	import logo from '$lib/images/logo.jpg';
	import {
		Footer,
		FooterCopyright,
		FooterLink,
		FooterLinkGroup,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl
	} from 'flowbite-svelte';
	import { LinkedinSolid, GithubSolid } from 'flowbite-svelte-icons';
	import '../app.css';
	import type { PageData } from './$types';
	import ContactModal from '$lib/components/ContactModal.svelte';

	let { children, data }: { data: PageData; children: any } = $props();
	console.log('data', data);
	let openContact = $state(false);
</script>

<svelte:head><title>Rajit Khosla</title></svelte:head>
<div class="app">
	<header>
		<Navbar class="start-0 top-0 z-20 w-full px-2 py-2.5 sm:px-4">
			<NavBrand href="/">
				<img src={logo} class="me-3 h-8 sm:h-9" alt="Rajit Khosla" />
				<span class="text-l self-center font-semibold whitespace-nowrap dark:text-white">
					From pixels to live products
				</span>
			</NavBrand>
			<NavHamburger />
			<NavUl>
				{#each data.navs as nav}
					<NavLi href="/{nav.path}">{nav.displayName}</NavLi>
				{/each}
			</NavUl>
		</Navbar>
	</header>

	<main>
		{@render children()}
	</main>

	<Footer>
		<FooterCopyright href="/" year={2025} />
		<FooterLinkGroup
			class="mt-3 flex flex-wrap items-center text-sm text-gray-500 sm:mt-0 dark:text-gray-400"
		>
			<FooterLink
				onclick={() => {
					openContact = true;
				}}
				>Contact
			</FooterLink>
			<FooterLink href="https://github.com/your-profile"><GithubSolid /></FooterLink>
			<FooterLink href="https://www.linkedin.com/in/rajit-khosla-05065527/"
				><LinkedinSolid /></FooterLink
			>
		</FooterLinkGroup>
	</Footer>
	<ContactModal bind:open={openContact} />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
