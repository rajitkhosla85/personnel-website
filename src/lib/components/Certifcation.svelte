<script lang="ts">
	import { Card } from 'flowbite-svelte';
	import aws from '$lib/images/certifications/aws.webp';
	import azure from '$lib/images/certifications/azure.webp';
	import ckad from '$lib/images/certifications/ckad.webp';
	import safe4 from '$lib/images/certifications/safe4.webp';
	import Animate from './Animate.svelte';

	const certifications = [
		{
			src: ckad,
			alt: 'Certified Kubernetes Application Developer',
			label: 'Kubernetes',
			badge: 'Certified Kubernetes Application Developer'
		},
		{
			src: aws,
			alt: 'AWS Solution Architect Associate',
			label: 'AWS',
			badge: 'AWS Solution Architect Associate'
		},
		{
			src: azure,
			alt: 'Azure Fundamentals',
			label: 'Azure',
			badge: 'Azure Fundamentals'
		},
		{
			src: safe4,
			alt: 'Safe4 Practitioner',
			label: 'SAFe',
			badge: 'SAFE4'
		}
	];
</script>

<div class="grid w-full gap-7 sm:grid-cols-2">
	{#each certifications as { src, alt, label, badge }, index}
		<Animate variant={index % 2 === 0 ? 'left' : 'right'} duration={1.2} delay={0.5}>
			<Card
				class="h-full w-full rounded-2xl border border-amber-500 p-4 shadow-md transition-transform hover:scale-105 hover:shadow-lg sm:p-6 md:p-8"
			>
				<div class="flex w-full transform flex-col items-center text-center">
					<img {src} {alt} class="mb-2 h-24 object-contain" />
					<div class="text-sm font-medium">{label}</div>
					<span class="mt-1 rounded-full bg-amber-100 px-3 py-0.5 text-xs text-amber-800">
						{badge}
					</span>
				</div>
			</Card>
		</Animate>
	{/each}
</div>
