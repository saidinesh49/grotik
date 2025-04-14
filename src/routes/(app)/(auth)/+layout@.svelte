<script>
import { toast, Toaster } from 'svelte-sonner';
import { userStore, isAuthenticated } from '$lib/stores/auth';
import { goto } from '$app/navigation';
import { onMount } from 'svelte';

onMount(() => {
    if ($isAuthenticated) {
        goto('/dashboard');
    }
});
</script>

<Toaster theme='dark' />
<slot></slot>
