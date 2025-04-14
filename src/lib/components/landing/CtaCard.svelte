<script lang="ts">
	import { useAnimation, Motion } from 'svelte-motion';
	import { inview } from 'svelte-inview';
	import type { ObserverEventDetails, ScrollDirection, Options } from 'svelte-inview';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	export let id: string = crypto.randomUUID().slice(0, 6);
	let controls = useAnimation();
	// let ref;
	let inView = false;
	// we want to make animation based on when it come in view we want to make like fade animation from opacity - 0 to opacity 1
	const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
		// console.log(detail);
		inView = detail.inView;
	};
	$: {
		if (inView) {
			controls.start({
				opacity: 1,
				transition: { delay: Math.random() * 2, ease: 'easeOut', duration: 1 }
			});
		}
	}
</script>

<Motion initial={{ opacity: 0 }} animate={controls} let:motion>
	<div
		{id}
		use:inview={{
			rootMargin: '-50px',
			unobserveOnEnter: true
		}}
		on:inview_change={handleChange}
		use:motion
		class={cn(
			'relative size-24 m-3 cursor-pointer overflow-hidden rounded-2xl p-4',
			// light styles
			'bg-white/80 backdrop-blur-sm [box-shadow:0_8px_16px_rgba(0,0,0,.08)]',
			// dark styles
			'transform-gpu dark:bg-black/50 dark:backdrop-blur-sm dark:[box-shadow:0_8px_16px_rgba(0,0,0,.2)]'
		)}
	>
		<slot></slot>
	</div>
</Motion>
