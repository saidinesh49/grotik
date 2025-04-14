<script lang="ts">
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { cn } from '$lib/utils';

    export let asChild = false;
    export let builders: any[] = [];
    export let className = '';

    const { open, setOpen } = getContext<{
        open: Writable<boolean>;
        setOpen: (value: boolean) => void;
    }>('dropdown-menu');

    function handleClick() {
        setOpen(!$open);
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setOpen(!$open);
        }
    }
</script>

<div
    class={cn(
        'inline-flex items-center justify-center',
        className
    )}
    role="button"
    tabindex="0"
    aria-haspopup="true"
    aria-expanded={$open}
    on:click={handleClick}
    on:keydown={handleKeyDown}
    {...$$restProps}>
    <slot builders={builders} />
</div>