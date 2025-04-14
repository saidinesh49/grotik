<script lang="ts">
    import { cn } from '$lib/utils';
    import AnimatedShinyText from '$lib/components/magic/AnimatedShinyText/AnimatedShinyText.svelte';

    export let level: 'h1' | 'h2' | 'h3' | 'h4' = 'h2';
    export let size: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
    export let className = '';

    const sizeClasses = {
        sm: 'text-2xl',
        md: 'text-3xl',
        lg: 'text-4xl sm:text-5xl',
        xl: 'text-5xl sm:text-6xl'
    };
</script>

<svelte:element 
    this={level}
    class={cn(
        'font-bold tracking-tight text-black dark:text-white',
        sizeClasses[size],
        className
    )}
>
    <AnimatedShinyText shimmerWidth={200}>
        <slot />
    </AnimatedShinyText>
</svelte:element>
