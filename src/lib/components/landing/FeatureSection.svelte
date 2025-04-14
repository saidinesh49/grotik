<script lang="ts">
    import { Brain, Globe2, Coins, MessageSquare, BookOpen, ShieldCheck } from 'lucide-svelte';
    import ShinyHeading from '$lib/components/ui/heading/ShinyHeading.svelte';
    import { inview } from 'svelte-inview';
    import type { ObserverEventDetails } from 'svelte-inview';

    let inView = false;

    const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
        inView = detail.inView;
    };

    const features = [
        {
            icon: Brain,
            title: 'AI Language Assistant',
            description: 'Groq-powered AI adapts to your language level and provides real-time feedback on pronunciation and grammar'
        },
        {
            icon: Coins,
            title: 'Learn by Doing',
            description: 'Practice real financial transactions using Stellar testnet - from international transfers to investment simulations'
        },
        {
            icon: MessageSquare,
            title: 'Interactive Scenarios',
            description: 'Role-play real financial situations in your language - banking, investing, budgeting, and more'
        },
        {
            icon: Globe2,
            title: 'Cultural Context',
            description: 'Learn financial terms and concepts with cultural context and real-world examples from your region'
        },
        {
            icon: BookOpen,
            title: 'Practical Curriculum',
            description: 'Start with basic banking and progress to advanced topics like international remittances and investments'
        },
        {
            icon: ShieldCheck,
            title: 'Risk-Free Practice',
            description: 'Master financial skills in a safe environment using virtual money on the Stellar testnet'
        }
    ];
</script>

<section 
    id="features" 
    class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
    use:inview={{
        unobserveOnEnter: true,
        rootMargin: '-100px'
    }}
    on:inview_change={handleChange}
>
    <div class="mx-auto max-w-2xl text-center">
        <p class="text-base font-semibold leading-7 text-black/60 dark:text-white/60">Features</p>
        <ShinyHeading size="lg" className="mt-2">
            Everything you need to master finance in your language
        </ShinyHeading>
        <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Break down language barriers and gain practical financial skills with Groq AI and Stellar blockchain technology.
        </p>
    </div>
    <div class="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
        <dl class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {#each features as feature, i}
                <div class="relative {inView ? 'animate-fade-up' : ''} opacity-0" style="animation-delay: {i * 100}ms;">
                    <dt class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                        <div class="absolute left-1 top-1 flex size-12 items-center justify-center rounded-full bg-black dark:bg-white shadow-md">
                            <svelte:component this={feature.icon} class="size-6 text-white dark:text-black" />
                        </div>
                        <div class="ml-16 pt-1">{feature.title}</div>
                    </dt>
                    <dd class="mt-4 ml-16 text-base leading-7 text-gray-600 dark:text-gray-300">
                        <div class="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-black/5 dark:border-white/5 hover:shadow-sm transition-all duration-300">
                            {feature.description}
                        </div>
                    </dd>
                </div>
            {/each}
        </dl>
    </div>
</section>
