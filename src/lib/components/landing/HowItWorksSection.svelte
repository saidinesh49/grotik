<script lang="ts">
    import { inview } from 'svelte-inview';
    import ShinyHeading from '$lib/components/ui/heading/ShinyHeading.svelte';
    import { Brain, MessageSquare, Coins } from 'lucide-svelte';
    import type { ObserverEventDetails } from 'svelte-inview';
    import { fly } from 'svelte/transition';

    let inView = false;
    const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
        inView = detail.inView;
    };

    const steps = [
        {
            icon: Brain,
            title: 'Choose Your Language',
            description: 'Select your native language and the financial topics you want to learn'
        },
        {
            icon: MessageSquare,
            title: 'Practice with Groq AI',
            description: 'Engage in natural conversations with our Groq-powered AI tutor to learn financial vocabulary and concepts'
        },
        {
            icon: Coins,
            title: 'Apply with Stellar',
            description: 'Use the Stellar testnet to simulate real financial transactions and practice what you\'ve learned'
        }
    ];
</script>

<section 
    id="how-it-works"
    class="relative mx-auto px-6 py-32 sm:py-40 lg:px-8 bg-gradient-to-b from-[#f8f2ea] to-[#fcf7f2] dark:from-[#1a1816] dark:to-[#1c1a18]"
    use:inview={{
        unobserveOnEnter: true,
        rootMargin: '50px'
    }}
    on:inview_change={handleChange}
>
    <!-- Curved top edge -->
    <div class="absolute inset-x-0 top-0 h-16 bg-background">
        <div class="absolute inset-x-0 -bottom-16 h-16 rounded-[100%/16px] bg-[#f8f2ea] dark:bg-[#1a1816]"></div>
    </div>
    
    <!-- Curved bottom edge -->
    <div class="absolute inset-x-0 bottom-0 h-16 bg-background">
        <div class="absolute inset-x-0 -top-16 h-16 rounded-[100%/16px] bg-[#fcf7f2] dark:bg-[#1c1a18]"></div>
    </div>

    <div class="relative mx-auto max-w-7xl">
        <div class="mx-auto max-w-2xl text-center">
            <p class="text-base font-semibold leading-7 text-black/70 dark:text-white/70">How It Works</p>
            <ShinyHeading size="lg" className="mt-2">
                Learn Finance, Naturally
            </ShinyHeading>
            <p class="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
                Our unique approach combines language learning with practical financial skills
            </p>
        </div>

        <div class="mx-auto mt-20 max-w-7xl">
            <div class="relative">
                <div class="absolute left-1/2 top-8 -z-10 h-[calc(100%-4rem)] w-0.5 -translate-x-1/2 bg-gradient-to-b from-black/30 via-black/5 to-transparent dark:from-white/30 dark:via-white/5"></div>
                
                <div class="grid grid-cols-1 gap-16 md:grid-cols-3">
                    {#each steps as step, i}
                        <div 
                            class="relative flex flex-col items-center p-6 text-center"
                            in:fly={{
                                y: 20,
                                duration: 300,
                                delay: i * 200
                            }}
                        >
                            <div class="flex h-20 w-48 items-center justify-center rounded-full border-2 border-black/20 bg-[#fff8f3] shadow-lg dark:border-white/20 dark:bg-[#211e1c]">
                                <svelte:component 
                                    this={step.icon}
                                    class="h-8 w-8 text-black dark:text-white"
                                />
                            </div>
                            
                            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-black text-white mt-6 mb-2 text-lg font-bold shadow-md dark:bg-white dark:text-black">
                                {i + 1}
                            </div>
                            
                            <h3 class="mt-4 text-xl font-semibold text-black dark:text-white">
                                {step.title}
                            </h3>
                            <p class="mt-4 px-6 py-8 rounded-3xl bg-[#fff8f3] dark:bg-[#211e1c] border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300 shadow-md">
                                {step.description}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>
