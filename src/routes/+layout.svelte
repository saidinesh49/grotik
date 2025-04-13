<script lang="ts">
	import '../app.css';
    import { theme } from '$lib/stores/theme';
    import { onMount } from 'svelte';
    import ThemeSwitcher from '$lib/components/ui/theme-switcher/ThemeSwitcher.svelte';

    onMount(() => {
        theme.initialize();
    });
</script>

<div class="relative min-h-screen">
    <!-- Theme Switcher -->
    <div class="fixed right-4 top-4 z-50">
        <ThemeSwitcher />
    </div>

    <slot />
</div>
