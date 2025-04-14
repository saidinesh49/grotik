<script lang="ts">
	import { BarChart, ChevronRight, File, Globe, HeartHandshake, Rss, Shield, Brain, Coins } from 'lucide-svelte';
	import Marquee from '../magic/marquee/Marquee.svelte';
	import CtaCard from './CtaCard.svelte';
	import Button from '../ui/button/button.svelte';
	let tiles: { icon: any; bg: string }[] = [
		{
			icon: HeartHandshake,
			bg: 'pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-black/20 opacity-30 blur-[20px] dark:bg-white/20'
		},
		{
			icon: Brain,
			bg: 'pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-black/20 opacity-30 blur-[20px] dark:bg-white/20'
		},
		{
			icon: Coins,
			bg: 'pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-black/20 opacity-30 blur-[20px] dark:bg-white/20'
		},
		{
			icon: Shield,
			bg: 'pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-black/20 opacity-30 blur-[20px] dark:bg-white/20'
		},
		{
			icon: Globe,
			bg: 'pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-black/20 opacity-30 blur-[20px] dark:bg-white/20'
		},
		{
			icon: BarChart,
			bg: 'pointer-events-none absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-full bg-black/20 opacity-30 blur-[20px] dark:bg-white/20'
		}
	];
	function shuffleArray(array: any[]) {
		let currentIndex = array.length;
		let randomIndex;
		// While there remain elements to shuffle.
		while (currentIndex !== 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}
		return array;
	}
	let randomTiles1 = shuffleArray([...tiles]);
	let randomTiles2 = shuffleArray([...tiles]);
	let randomTiles3 = shuffleArray([...tiles]);
</script>

<section id="cta" class="relative bg-gradient-to-b from-black/5 to-black/10 dark:from-white/5 dark:to-white/10 overflow-hidden">
	<!-- Curved top edge -->
    <div class="absolute inset-x-0 top-0 h-16 bg-background">
        <div class="absolute inset-x-0 -bottom-16 h-16 rounded-[100%/16px] bg-black/5 dark:bg-white/5"></div>
    </div>

	<div class="w-full mx-auto py-20 sm:py-28 mb-16">
		<div class="flex w-full flex-col items-center justify-center">
			<div class="relative flex w-full flex-col items-center justify-center overflow-visible">
				<!-- Marquee with extended height for better visibility -->
				<div class="h-[300px] md:h-[320px] lg:h-[340px] w-full overflow-hidden">
					<div class="mb-8 mt-2">
						<Marquee reverse class="[--duration:50s]" repeat={3}>
							{#each randomTiles1 as { icon, bg }, id}
								<CtaCard>
									<svelte:component this={icon} class="size-full" />
									<div class={bg}></div>
								</CtaCard>
							{/each}
						</Marquee>
					</div>
					<div class="mb-8">
						<Marquee reverse={false} class="[--duration:40s]" repeat={3}>
							{#each randomTiles2 as { icon, bg }, id}
								<CtaCard>
									<svelte:component this={icon} class="size-full" />
									<div class={bg}></div>
								</CtaCard>
							{/each}
						</Marquee>
					</div>
					<div>
						<Marquee reverse class="[--duration:45s]" repeat={3}>
							{#each randomTiles3 as { icon, bg }, id}
								<CtaCard>
									<svelte:component this={icon} class="size-full" />
									<div class={bg}></div>
								</CtaCard>
							{/each}
						</Marquee>
					</div>
				</div>
				
				<!-- Centered content with staggered icons -->
				<div class="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full">
					<div
						class="mx-auto size-36 rounded-full border-4 border-black bg-white/95 p-4 shadow-2xl backdrop-blur-sm dark:border-white dark:bg-black/95 lg:size-44"
					>
						<div class="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-sm">
							<!-- Sequential icon display instead of overlapping -->
							<div class="absolute size-full flex items-center justify-center">
								<div class="absolute size-full flex items-center justify-center">
									<HeartHandshake class="size-16 text-black dark:text-white lg:size-20" />
								</div>
								<div class="absolute size-10 top-4 right-4 bg-white/90 dark:bg-black/90 rounded-full flex items-center justify-center shadow-md">
									<Brain class="size-6 text-black dark:text-white" />
								</div>
								<div class="absolute size-10 bottom-4 left-4 bg-white/90 dark:bg-black/90 rounded-full flex items-center justify-center shadow-md">
									<Coins class="size-6 text-black dark:text-white" />
								</div>
							</div>
						</div>
					</div>
					<div class="z-10 mt-20 px-4 sm:px-8 flex flex-col items-center text-center">
						<div class="bg-white/90 dark:bg-black/90 backdrop-blur-md py-8 px-6 sm:px-10 rounded-3xl shadow-xl max-w-2xl">
							<h1 class="text-3xl font-bold text-black dark:text-white lg:text-4xl">Start Your Financial Journey Today</h1>
							<p class="mt-6 text-center text-gray-600 dark:text-gray-300 text-lg">
								Learn finance in your language with interactive lessons powered by <span class="font-semibold">Groq AI</span> and <span class="font-semibold">Stellar blockchain</span> technology.
							</p>
							<Button size="lg" class="group mt-10 rounded-full px-8 py-6 text-lg bg-black text-white border-2 border-black hover:bg-black/90 dark:bg-white dark:text-black dark:border-white dark:hover:bg-white/90">
								Get Started
								<ChevronRight
									class="ml-2 size-5 transition-all duration-300 ease-out group-hover:translate-x-1"
								/>
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
