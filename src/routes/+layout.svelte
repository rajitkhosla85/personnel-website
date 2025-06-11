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
	import { Collapse } from 'flowbite';
	import { onMount } from 'svelte';
	import type { CollapseOptions, CollapseInterface } from 'flowbite';
	import type { InstanceOptions } from 'flowbite';

	let { children, data }: { data: PageData; children: any } = $props();

	console.log('data', data);
	let openContact = $state(false);
	let collapse: CollapseInterface;
	let hideNavMenu = $state(false);
	onMount(() => {
		// set the target element that will be collapsed or expanded (eg. navbar menu)
		const targetEl = document.getElementById('targetEl');

		// optionally set a trigger element (eg. a button, hamburger icon)
		const triggerEl = document.getElementById('triggerEl');

		// optional options with default values and callback functions
		const options: CollapseOptions = {
			onCollapse: () => {
				console.log('element has been collapsed');
			},
			onExpand: () => {
				console.log('element has been expanded');
			},
			onToggle: () => {
				console.log('element has been toggled');
			}
		};

		const instanceOptions: InstanceOptions = {
			id: 'targetEl',
			override: true
		};

		/*
		 * $targetEl: required
		 * $triggerEl: optional
		 * options: optional
		 */
		collapse = new Collapse(targetEl, triggerEl, options, instanceOptions);
	});
	const onClickNavUL = () => {
		collapse.collapse();
		hideNavMenu = true;
	};
	const onNavHamburgerClick = () => {
		collapse.expand();
		//toggleFn();
		console.log('onNavHamburgerClick', hideNavMenu);
		if (hideNavMenu) {
			hideNavMenu = false;
		}
	};
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
			<NavHamburger onclick={onNavHamburgerClick} />
			<NavUl id="targetEl">
				{#each data.navs as nav}
					<NavLi onclick={() => onClickNavUL()} href="/{nav.path}">{nav.displayName}</NavLi>
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
