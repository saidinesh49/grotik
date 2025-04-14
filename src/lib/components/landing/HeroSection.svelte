<script lang="ts">
	import { ArrowRightIcon } from 'lucide-svelte';
	import AnimatedShinyText from '$lib/components/magic/AnimatedShinyText/AnimatedShinyText.svelte';
	import BorderBeam from '$lib/components/magic/borderbeam/BorderBeam.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Modal from '$lib/components/ui/modal/Modal.svelte';
	import AuthCard from '$lib/components/auth/AuthCard.svelte';
	import type { ObserverEventDetails } from 'svelte-inview';
	import { inview } from 'svelte-inview';

	// Images
	import HeroDarkImg from '$lib/imgs/hero-dark.png';
	import HeroLightImg from '$lib/imgs/hero-light.png';
	
	let inView = false;
	let isAuthModalOpen = false;

	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		// console.log(detail);
		inView = detail.inView;
	};

	function openAuthModal() {
		isAuthModalOpen = true;
	}

	function closeAuthModal() {
		isAuthModalOpen = false;
	}
</script>

<section id="hero" class="relative mx-auto mt-32 max-w-7xl px-6 text-center md:px-8">
	<div
		class="backdrop-filter-[12px] group inline-flex h-7 -translate-y-4 animate-fade-in items-center justify-between gap-1 rounded-full border border-black/10 bg-white/10 px-3 text-xs text-black opacity-0 transition-all ease-in hover:cursor-pointer hover:bg-white/20 dark:border-white/10 dark:text-white"
	>
		<AnimatedShinyText class="inline-flex items-center justify-center">
			<span>✨ Learn Finance in Any Language with Groq & Stellar</span>
			{' '}
			<ArrowRightIcon
				class="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
			/>
		</AnimatedShinyText>
	</div>
	<h1
		class="-translate-y-4 animate-fade-in text-balance bg-gradient-to-br from-black from-30% to-black/70 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent opacity-0 [--animation-delay:200ms] dark:from-white dark:to-white/70 sm:text-6xl md:text-7xl lg:text-8xl"
	>
		Master Finance in
		<br class="hidden md:block" />
		{' '}
		Your Language
	</h1>
	<p
		class="mb-12 -translate-y-4 animate-fade-in text-balance text-lg tracking-tight text-gray-600 opacity-0 [--animation-delay:400ms] md:text-xl dark:text-gray-300"
	>
		Interactive financial literacy lessons in multiple languages.
		<br class="hidden md:block" />
		{' '}
		Learn essential money skills with Groq-powered AI guidance and Stellar blockchain simulations.
	</p>
	
	<div class="flex justify-center gap-4">
		<Button
			on:click={openAuthModal}
			class="-translate-y-4 animate-fade-in px-6 rounded-full border border-black bg-black text-white opacity-0 ease-in-out hover:bg-black/90 [--animation-delay:600ms] dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/90"
		>
			<span>Start Learning Now</span>
			<ArrowRightIcon
				class="ml-1 size-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
			/>
		</Button>
		<Button
			class="-translate-y-4 animate-fade-in px-6 rounded-full border border-black/20 bg-transparent text-black opacity-0 ease-in-out hover:bg-black/5 [--animation-delay:600ms] dark:border-white/20 dark:text-white dark:hover:bg-white/5"
		>
			<span>Explore Courses</span>
		</Button>
	</div>
	
	<div class="flex justify-center mt-8 gap-4 opacity-0 animate-fade-in [--animation-delay:800ms]">
		<div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
			<span>Powered by</span>
			<span class="font-semibold text-black dark:text-white">Groq</span>
			<span>&</span>
			<span class="font-semibold text-black dark:text-white">Stellar</span>
		</div>
	</div>
	
	<div
		use:inview={{
			unobserveOnEnter: true,
			rootMargin: '-100px'
		}}
		on:inview_change={handleChange}
		class="relative mt-24 mb-32 animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px]"
	>
		<div
			class="rounded-3xl border border-black/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:size-full before:opacity-0 before:[background-image:linear-gradient(to_bottom,#f5f5f5,#f5f5f5,transparent_40%)] before:[filter:blur(180px)] dark:border-white/10 dark:before:[background-image:linear-gradient(to_bottom,#1a1a1a,#1a1a1a,transparent_40%)] {inView
				? 'before:animate-image-glow'
				: ''}"
		>
			<BorderBeam
				size={200}
				duration={12}
				delay={0}
				colorFrom="#f5f5f5"
				colorTo="#e0e0e0"
			/>

			<div class="relative w-full overflow-hidden rounded-[inherit] aspect-[16/9] max-w-5xl mx-auto">
				<img
					src={HeroDarkImg}
					alt="Grotik Platform Dark Theme"
					class="hidden w-full h-full object-contain dark:block"
				/>
				<img
					src={HeroLightImg}
					alt="Grotik Platform Light Theme"
					class="block w-full h-full object-contain dark:hidden"
				/>
			</div>
		</div>
	</div>
	
	{#if isAuthModalOpen}
		<Modal on:close={closeAuthModal}>
			<AuthCard />
		</Modal>
	{/if}
</section>
