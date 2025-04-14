<script>
	import { Brain, Coins, BookOpen, MessageCircle, Globe, HeartHandshake, ArrowRight } from 'lucide-svelte';

	const currentYear = new Date().getFullYear();

	const footerLinks = [
		{
			label: 'Platform',
			items: [
				{ href: '/features', name: 'Features' },
				{ href: '/pricing', name: 'Pricing' },
				{ href: '/help', name: 'Help Center' }
			]
		},
		{
			label: 'Resources',
			items: [
				{ href: '/blog', name: 'Blog' },
				{ href: '/documentation', name: 'Documentation' },
				{ href: '/roadmap', name: 'Roadmap' }
			]
		},
		{
			label: 'Company',
			items: [
				{ href: '/about', name: 'About' },
				{ href: '/privacy', name: 'Privacy' },
				{ href: '/terms', name: 'Terms' }
			]
		}
	];

	const technologies = [
		{
			name: 'Groq AI',
			icon: Brain,
			url: 'https://groq.com',
			description: 'Ultra-fast language processing'
		},
		{
			name: 'Stellar',
			icon: Coins,
			url: 'https://stellar.org',
			description: 'Blockchain payment infrastructure'
		}
	];
</script>

<footer class="border-t border-black/10 bg-white dark:border-white/10 dark:bg-black/20">
	<div class="mx-auto max-w-7xl px-6 py-10 lg:px-8">
		<div class="flex flex-col justify-between gap-10 md:flex-row">
			<!-- Brand Column -->
			<div class="max-w-xs">
				<a href="/" class="flex items-center gap-2">
					<div class="flex size-10 items-center justify-center rounded-full border-2 border-black bg-white dark:border-white dark:bg-black">
						<HeartHandshake class="size-5 text-black dark:text-white" />
					</div>
					<span class="text-xl font-semibold text-black dark:text-white">Grotik</span>
				</a>
				<p class="mt-4 text-sm text-black/70 dark:text-white/70">
					Breaking language barriers in financial education with AI-powered learning and blockchain technology.
				</p>
				
				<div class="mt-8">
					<h3 class="mb-4 text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">
						Powered by
					</h3>
					<div class="space-y-4">
						{#each technologies as tech}
							<a 
								href={tech.url}
								target="_blank" 
								rel="noopener noreferrer"
								class="flex items-center gap-3 rounded-lg border border-black/10 px-4 py-3 transition-all duration-300 hover:border-black/30 hover:shadow-sm dark:border-white/10 dark:hover:border-white/30"
							>
								<div class="flex size-8 shrink-0 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
									<svelte:component this={tech.icon} class="size-4" />
								</div>
								<div>
									<p class="text-sm font-medium text-black dark:text-white">{tech.name}</p>
									<p class="text-xs text-black/60 dark:text-white/60">{tech.description}</p>
								</div>
								<ArrowRight class="ml-auto size-3 text-black/40 dark:text-white/40" />
							</a>
						{/each}
					</div>
				</div>
			</div>
			
			<!-- Links Columns -->
			<div class="grid grid-cols-2 gap-8 sm:grid-cols-3 sm:gap-10">
				{#each footerLinks as section}
					<div>
						<h3 class="mb-4 text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">
							{section.label}
						</h3>
						<ul class="space-y-2">
							{#each section.items as item}
								<li>
									<a
										href={item.href}
										class="text-sm font-medium text-black/80 transition-colors duration-200 hover:text-black dark:text-white/80 dark:hover:text-white"
									>
										{item.name}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</div>
		
		<div class="mt-10 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 dark:border-white/10 md:flex-row">
			<p class="text-xs text-black/60 dark:text-white/60">
				© {currentYear} Grotik. All rights reserved.
			</p>
			<div class="flex items-center gap-6">
				<a href="/privacy" class="text-xs font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white">Privacy</a>
				<a href="/terms" class="text-xs font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white">Terms</a>
				<a href="/contact" class="text-xs font-medium text-black/80 hover:text-black dark:text-white/80 dark:hover:text-white">Contact</a>
			</div>
		</div>
	</div>
</footer>
