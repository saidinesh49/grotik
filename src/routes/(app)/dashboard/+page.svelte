<script lang="ts">
    import { userStore } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { User, Settings, Book, Trophy, Target } from 'lucide-svelte';
    import BorderBeam from '$lib/components/magic/borderbeam/BorderBeam.svelte';

    onMount(() => {
        if (!$userStore.user) {
            goto('/signin');
        }
    });

    const menuItems = [
        { icon: Book, label: 'Lessons', href: '/lessons' },
        { icon: Trophy, label: 'Progress', href: '/progress' },
        { icon: Target, label: 'Goals', href: '/goals' },
        { icon: Settings, label: 'Settings', href: '/settings' }
    ];
</script>

<svelte:head>
    <title>Dashboard | Grotik</title>
    <meta name="description" content="Your financial learning dashboard" />
</svelte:head>

<div class="container py-8">
    <!-- Welcome Section -->
    <div class="relative mb-8 overflow-hidden rounded-lg border border-border bg-card p-8">
        <BorderBeam
            size={150}
            duration={10}
            delay={0}
            colorFrom="var(--color-one)"
            colorTo="var(--color-two)"
        />
        <div class="relative z-10">
            <div class="flex items-center gap-4">
                {#if $userStore.user?.photoURL}
                    <img
                        src={$userStore.user.photoURL}
                        alt="Profile"
                        class="size-16 rounded-full border-2 border-border"
                    />
                {:else}
                    <div class="flex size-16 items-center justify-center rounded-full border-2 border-border bg-muted">
                        <User class="size-8 text-muted-foreground" />
                    </div>
                {/if}
                <div>
                    <h2 class="text-2xl font-bold">Welcome, {$userStore.user?.displayName || 'User'}</h2>
                    <p class="text-muted-foreground">Continue your financial learning journey</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Menu Grid -->
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {#each menuItems as { icon: Icon, label, href }}
            <a
                {href}
                class="group relative overflow-hidden rounded-lg border border-border bg-card p-6 hover:border-border/80"
            >
                <div class="flex flex-col items-center gap-4 text-center">
                    <div class="rounded-full border-2 border-border bg-background p-4 transition-colors group-hover:border-border/80">
                        <Icon class="size-6" />
                    </div>
                    <h3 class="font-semibold">{label}</h3>
                </div>
            </a>
        {/each}
    </div>
</div> 