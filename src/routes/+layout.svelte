<script lang="ts">
	import '../app.css';
    import { theme } from '$lib/stores/theme';
    import { onMount } from 'svelte';
    import Header from '$lib/layout/Header.svelte';
    import { page } from '$app/stores';

    // Routes where header should not be shown
    const routesWithoutHeader = ['/signin', '/signup', '/auth/reset-password'];
    $: showHeader = !routesWithoutHeader.includes($page.url.pathname);

    onMount(() => {
        theme.initialize();
    });
</script>

<div class="flex min-h-screen flex-col bg-background">
    {#if showHeader}
        <Header />
    {/if}
    
    <!-- Main Content -->
    <main class="flex-1">
        <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-border/40 py-6">
        <div class="container flex items-center justify-between">
            <p class="text-sm text-muted-foreground">
                © 2024 Grotik. All rights reserved.
            </p>
            <nav class="flex gap-4">
                <a href="/privacy" class="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
                <a href="/terms" class="text-sm text-muted-foreground hover:text-foreground">Terms</a>
                <a href="/contact" class="text-sm text-muted-foreground hover:text-foreground">Contact</a>
            </nav>
        </div>
    </footer>
</div>
