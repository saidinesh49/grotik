<script lang="ts">
	import { LoaderIcon, CheckIcon } from 'lucide-svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { cn } from '$lib/utils';
	import { fly } from 'svelte/transition';

	let productPrices = [
		{
			id: 'beginner',
			name: 'Self-Paced Learning',
			description: 'Perfect for beginners starting their financial journey',
			features: [
				'Core financial lessons',
				'Basic budgeting tools',
				'5 language options',
				'Community support'
			],
			price: 'Free',
			isMostPopular: false
		},
		{
			id: 'guided',
			name: 'Guided Learning',
			description: 'For dedicated learners seeking comprehensive knowledge',
			features: [
				'Advanced financial concepts',
				'Personal finance tools',
				'All language options',
				'1-on-1 mentoring sessions',
				'Progress tracking'
			],
			price: 'Coming Soon',
			isMostPopular: true
		},
		{
			id: 'family',
			name: 'Family Learning',
			description: 'Share financial education with your whole family',
			features: [
				'Up to 5 family accounts',
				'Family progress dashboard',
				'All premium features',
				'Custom learning paths',
				'Family finance tools',
				'Group mentoring sessions'
			],
			price: 'Coming Soon',
			isMostPopular: false
		}
	];

	let isLoading = false;
	let index = '';
	let onSubscribeClick = async (priceId: string) => {
		index = priceId;
		isLoading = true;
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		isLoading = false;
	};
</script>

<section id="pricing">
	<div class="mx-auto flex max-w-screen-xl flex-col gap-8 px-4 py-14 md:px-8">
		<div class="mx-auto max-w-5xl text-center">
			<h4 class="text-xl font-bold tracking-tight text-black dark:text-white">Learning Paths</h4>

			<h2 class="text-5xl font-bold tracking-tight text-black dark:text-white sm:text-6xl">
				Choose Your Financial Journey
			</h2>

			<p class="mt-6 text-xl leading-8 text-black/80 dark:text-white">
				Select a learning path that matches your goals. Start your journey to financial literacy with
				personalized guidance and support.
			</p>
		</div>

		<div class="mx-auto grid w-full flex-col justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each productPrices as price, id}
				<div
					class={cn(
						'relative flex max-w-[400px] flex-col gap-8 overflow-hidden rounded-2xl border p-4 text-black dark:text-white',
						{
							'border-2 border-[var(--color-one)] dark:border-[var(--color-one)]':
								price.isMostPopular
						}
					)}
				>
					<div class="flex items-center">
						<div class="ml-4">
							<h2 class="text-base font-semibold leading-7">
								{price.name}
							</h2>
							<p class="h-12 text-sm leading-5 text-black/70 dark:text-white">
								{price.description}
							</p>
						</div>
					</div>
					<div class="flex flex-row gap-1">
						<span class="text-4xl font-bold text-black dark:text-white">
							{price.price}
						</span>
					</div>
					<Button
						class={cn(
							'group relative w-full gap-2 overflow-hidden text-lg font-semibold tracking-tighter',
							'transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2'
						)}
						disabled={isLoading}
						on:click={() => onSubscribeClick(price.id)}
					>
						<span
							class="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-white opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96 dark:bg-black"
						/>
						{#if isLoading && index === price.id}
							<LoaderIcon class="mr-2 size-4 animate-spin" />
							Loading...
						{:else if !isLoading || (isLoading && index !== price.id)}
							{price.id === 'beginner' ? 'Start Learning' : 'Join Waitlist'}
						{/if}
					</Button>

					<hr
						class="m-0 h-px w-full border-none bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0"
					/>
					{#if price.features && price.features.length > 0}
						<ul class="flex flex-col gap-2 font-normal">
							{#each price.features as feature, idx}
								<li class="flex items-center gap-3 text-xs font-medium text-black dark:text-white">
									<CheckIcon
										class="size-5 shrink-0  rounded-full bg-green-400 p-[2px] text-black dark:text-white"
									/>
									<span class="flex">{feature}</span>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
