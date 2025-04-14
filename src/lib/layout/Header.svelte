<script lang="ts">
	import { userStore, isAuthenticated } from '$lib/stores/auth';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import ThemeSwitcher from '$lib/components/ui/theme-switcher/ThemeSwitcher.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { LogOut, AlignJustify, XIcon, HeartHandshake, LayoutDashboard } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	const menuItems = [
		{
			id: 1,
			label: 'Features',
			href: '#features'
		},
		{
			id: 2,
			label: 'How It Works',
			href: '#how-it-works'
		},
		{
			id: 3,
			label: 'Try Demo',
			href: '#demo'
		}
	];

	function scrollToSection(e: Event, href: string) {
		e.preventDefault();
		const section = document.querySelector(href);
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
			hamburgerMenuIsOpen = false;
		}
	}

	let hamburgerMenuIsOpen = false;
	let innerWidth = 0;

	// Redirect if user is authenticated and tries to access auth pages
	$: if ($isAuthenticated && ($page.url.pathname === '/signin' || $page.url.pathname === '/signup')) {
		goto('/dashboard');
	}

	function toggleMenu() {
		hamburgerMenuIsOpen = !hamburgerMenuIsOpen;
		const html = document.querySelector('html');
		if (html) {
			html.classList.toggle('overflow-hidden', hamburgerMenuIsOpen);
		}
	}

	onMount(() => {
		return () => {
			const html = document.querySelector('html');
			if (html) {
				html.classList.remove('overflow-hidden');
			}
		};
	});
</script>

<svelte:window bind:innerWidth />

<header class="sticky top-4 z-50 mx-auto max-w-5xl w-[95%] rounded-full border border-black/10 bg-white/80 shadow-sm backdrop-blur dark:border-white/10 dark:bg-black/80">
	<div class="container flex h-12 items-center justify-between px-4">
		<div class="flex items-center gap-4">
			<a href="/" class="flex items-center gap-2">
				<div class="flex size-7 items-center justify-center rounded-full border border-black/50 bg-white dark:border-white/50 dark:bg-black">
					<HeartHandshake class="size-3.5 text-black dark:text-white" />
				</div>
				<span class="text-base font-semibold text-black dark:text-white">Grotik</span>
			</a>
			<nav class="hidden md:flex items-center gap-4">
				{#each menuItems as item}
					<a
						href={item.href}
						on:click={(e) => scrollToSection(e, item.href)}
						class="text-xs font-medium text-black/70 transition-colors hover:text-black dark:text-white/70 dark:hover:text-white"
					>
						{item.label}
					</a>
				{/each}
			</nav>
		</div>

		<div class="flex items-center gap-3">
			<ThemeSwitcher />
			
			{#if $isAuthenticated}
				<Button
					variant="ghost"
					size="icon"
					href="/dashboard"
					class="size-7 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
				>
					<LayoutDashboard class="size-4 text-black/80 dark:text-white/80" />
					<span class="sr-only">Dashboard</span>
				</Button>
				<Button
					variant="ghost"
					size="icon"
					on:click={() => userStore.signOut()}
					class="size-7 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
				>
					<LogOut class="size-4 text-black/80 dark:text-white/80" />
					<span class="sr-only">Sign out</span>
				</Button>
			{:else}
				<div class="hidden md:flex items-center gap-2">
					<Button variant="ghost" href="/signin" class="h-7 rounded-full px-3 text-xs font-medium text-black/80 hover:bg-black/5 dark:text-white/80 dark:hover:bg-white/5">Sign In</Button>
					<Button href="/signup" class="h-7 rounded-full bg-black px-3 text-xs font-medium text-white dark:bg-white dark:text-black">Sign Up</Button>
				</div>
				<button class="md:hidden rounded-full p-1.5 hover:bg-black/5 dark:hover:bg-white/5" on:click={toggleMenu}>
					<span class="sr-only">Toggle menu</span>
					{#if hamburgerMenuIsOpen}
						<XIcon size={18} strokeWidth={2} class="text-black dark:text-white"/>
					{:else}
						<AlignJustify size={18} strokeWidth={2} class="text-black dark:text-white" />
					{/if}
				</button>
			{/if}
		</div>
	</div>
</header>

{#if hamburgerMenuIsOpen && !$isAuthenticated}
	<nav class="fixed inset-0 z-40 bg-background/95 backdrop-blur md:hidden"
		 in:fly={{ y: -30, duration: 400 }}>
		<div class="container flex flex-col gap-6 pt-20">
			{#each menuItems as item}
				<a
					href={item.href}
					class="text-lg font-medium text-black dark:text-white"
					on:click={toggleMenu}
				>
					{item.label}
				</a>
			{/each}
			<div class="flex flex-col gap-2 pt-4 border-t border-black/10 dark:border-white/10">
				<Button variant="ghost" href="/signin" class="w-full justify-center rounded-full" on:click={toggleMenu}>
					Sign In
				</Button>
				<Button href="/signup" class="w-full justify-center rounded-full bg-black text-white dark:bg-white dark:text-black" on:click={toggleMenu}>
					Sign Up
				</Button>
			</div>
		</div>
	</nav>
{/if}
