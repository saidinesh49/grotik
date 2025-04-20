<script>
import { toast, Toaster } from 'svelte-sonner';
import { fade } from 'svelte/transition';
</script>

<Toaster theme="dark" />

<div in:fade={{ duration: 200 }}>
    <slot></slot>
</div>
