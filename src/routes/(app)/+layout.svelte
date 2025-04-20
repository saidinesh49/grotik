<script>
	import Footer from '$lib/layout/Footer.svelte';
	import Header from '$lib/layout/Header.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { isAuthenticated } from '$lib/stores/auth';
	import LoadingOverlay from '$lib/components/ui/LoadingOverlay.svelte';
	
	let loading = true;
	
	onMount(() => {
		// Get the current path
		const currentPath = $page.url.pathname;
		
		// Define auth pages
		const authPages = ['/signin', '/signup', '/auth/reset-password'];
		const isAuthPage = authPages.some(path => currentPath.startsWith(path));
		
		// Authentication logic
		if ($isAuthenticated) {
			// If authenticated and on auth pages, redirect to dashboard
			if (isAuthPage) {
				goto('/dashboard');
			} else {
				// If authenticated and on any other page, just stay there
				loading = false;
			}
		} else {
			// If not authenticated and not on auth pages, redirect to signin
			if (!isAuthPage) {
				goto('/signin');
			} else {
				// If not authenticated and on auth pages, just stay there
				loading = false;
			}
		}
	});
</script>

{#if loading}
	<LoadingOverlay 
		show={true} 
		text="Loading..." 
		spinnerSize="lg"
		spinnerColor="primary"
		fullScreen={true}
	/>
{:else}
	<div class="min-h-screen bg-background font-sans antialiased">
		<div class="mx-auto flex-1 overflow-hidden">
			<slot></slot>
		</div>
		<Footer />
	</div>
{/if}
