<script lang="ts">
    import { inview } from 'svelte-inview';
    import ShinyHeading from '$lib/components/ui/heading/ShinyHeading.svelte';
    import type { ObserverEventDetails } from 'svelte-inview';
    import Button from '$lib/components/ui/button/button.svelte';
    import { ArrowRight, Brain, Coins } from 'lucide-svelte';

    let inView = false;
    const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
        inView = detail.inView;
    };

    let currentDemo = 'conversation';
</script>

<section 
    id="demo"
    class="mx-auto max-w-7xl px-6 py-32 sm:py-40 lg:px-8"
    use:inview={{
        unobserveOnEnter: true,
        rootMargin: '50px'
    }}
    on:inview_change={handleChange}
>
    <div class="mx-auto max-w-2xl text-center">
        <p class="text-base font-semibold leading-7 text-black/60 dark:text-white/60">Interactive Demo</p>
        <ShinyHeading size="lg" className="mt-2">
            Experience Grotik in Action
        </ShinyHeading>
        <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Try our Groq AI conversation practice or explore Stellar blockchain simulations
        </p>
    </div>

    <div class="mx-auto mt-8 flex justify-center gap-4">
        <Button
            variant={currentDemo === 'conversation' ? 'default' : 'outline'}
            class={currentDemo === 'conversation' ? 'rounded-full border-2 border-black bg-black text-white px-8 dark:border-white dark:bg-white dark:text-black' : 'rounded-full border-2 border-black/20 bg-transparent text-black px-8 dark:border-white/20 dark:text-white'}
            on:click={() => currentDemo = 'conversation'}
        >
            <Brain class="mr-2 h-5 w-5" />
            Groq AI Conversation
        </Button>
        <Button
            variant={currentDemo === 'simulation' ? 'default' : 'outline'}
            class={currentDemo === 'simulation' ? 'rounded-full border-2 border-black bg-black text-white px-8 dark:border-white dark:bg-white dark:text-black' : 'rounded-full border-2 border-black/20 bg-transparent text-black px-8 dark:border-white/20 dark:text-white'}
            on:click={() => currentDemo = 'simulation'}
        >
            <Coins class="mr-2 h-5 w-5" />
            Stellar Simulation
        </Button>
    </div>

    <div class="mx-auto mt-12 max-w-3xl rounded-3xl border border-black/10 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-black/20">
        {#if currentDemo === 'conversation'}
            <div class="flex items-center mb-6">
                <div class="h-10 w-10 rounded-full bg-black/90 dark:bg-white/90 flex items-center justify-center">
                    <Brain class="h-5 w-5 text-white dark:text-black" />
                </div>
                <div class="ml-3">
                    <p class="text-sm font-semibold text-black dark:text-white">Groq-Powered AI Assistant</p>
                    <p class="text-xs text-black/50 dark:text-white/50">Response time: <span class="font-semibold">8ms</span></p>
                </div>
            </div>

            <div class="space-y-6">
                <div class="flex gap-4">
                    <div class="h-10 w-10 rounded-full border border-black/10 bg-gray-100 flex items-center justify-center text-sm font-semibold dark:border-white/10 dark:bg-gray-800">
                        You
                    </div>
                    <div class="flex-1 rounded-2xl bg-black/5 p-4 dark:bg-white/5">
                        Hello! I'd like to learn about international money transfers in Spanish.
                    </div>
                </div>
                
                <div class="flex gap-4">
                    <div class="h-10 w-10 rounded-full bg-black flex items-center justify-center dark:bg-white">
                        <Brain class="h-5 w-5 text-white dark:text-black" />
                    </div>
                    <div class="flex-1 rounded-2xl bg-black p-4 text-white dark:bg-white dark:text-black">
                        <p class="text-xs uppercase mb-1 opacity-60">Groq AI</p>
                        ¡Hola! Me alegro de ayudarte con las transferencias internacionales de dinero. ¿Qué te gustaría saber específicamente sobre el proceso de enviar dinero al extranjero?
                    </div>
                </div>
                
                <div class="flex gap-4">
                    <div class="h-10 w-10 rounded-full border border-black/10 bg-gray-100 flex items-center justify-center text-sm font-semibold dark:border-white/10 dark:bg-gray-800">
                        You
                    </div>
                    <div class="flex-1 rounded-2xl bg-black/5 p-4 dark:bg-white/5">
                        ¿Cómo puedo enviar dinero de forma segura a mi familia en México?
                    </div>
                </div>
                
                <div class="flex gap-4">
                    <div class="h-10 w-10 rounded-full bg-black flex items-center justify-center dark:bg-white">
                        <Brain class="h-5 w-5 text-white dark:text-black" />
                    </div>
                    <div class="flex-1 rounded-2xl bg-black p-4 text-white dark:bg-white dark:text-black">
                        <p class="text-xs uppercase mb-1 opacity-60">Groq AI</p>
                        Para enviar dinero de forma segura a México, puedes usar servicios de transferencia como Stellar, que ofrece transferencias rápidas y de bajo costo. También puedes usar bancos tradicionales o servicios como Western Union. Lo más importante es comparar las tasas de cambio y comisiones.
                    </div>
                </div>
            </div>
        {:else}
            <div class="flex items-center mb-6">
                <div class="h-10 w-10 rounded-full bg-black/90 dark:bg-white/90 flex items-center justify-center">
                    <Coins class="h-5 w-5 text-white dark:text-black" />
                </div>
                <div class="ml-3">
                    <p class="text-sm font-semibold text-black dark:text-white">Stellar Blockchain Simulator</p>
                    <p class="text-xs text-black/50 dark:text-white/50">Network: <span class="font-semibold">Testnet</span></p>
                </div>
            </div>

            <div class="space-y-6">
                <div class="rounded-2xl bg-black/5 p-6 dark:bg-white/5">
                    <h4 class="font-semibold text-lg text-black dark:text-white mb-2">Stellar Testnet Simulation</h4>
                    <p class="mb-6 text-gray-600 dark:text-gray-300">Practice sending remittances using virtual assets on the Stellar network</p>
                    
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <div class="rounded-2xl border border-black/10 p-4 bg-white dark:border-white/10 dark:bg-black">
                            <p class="text-sm text-black/60 dark:text-white/60">Your Balance</p>
                            <p class="text-2xl font-semibold text-black dark:text-white">1000 XLM</p>
                            <p class="text-xs text-black/40 dark:text-white/40 mt-1">≈ $110.00 USD</p>
                        </div>
                        <div class="rounded-2xl border border-black/10 p-4 bg-white dark:border-white/10 dark:bg-black">
                            <p class="text-sm text-black/60 dark:text-white/60">Exchange Rate</p>
                            <p class="text-2xl font-semibold text-black dark:text-white">1 XLM = $0.11 USD</p>
                            <p class="text-xs text-black/40 dark:text-white/40 mt-1">Updated just now</p>
                        </div>
                    </div>
                    
                    <div class="rounded-2xl border border-black/10 p-4 bg-white dark:border-white/10 dark:bg-black mb-6">
                        <p class="text-sm text-black/60 dark:text-white/60 mb-2">Send XLM</p>
                        <div class="flex gap-2">
                            <input type="text" class="flex-1 rounded-full border border-black/10 px-4 py-2 text-black dark:border-white/10 dark:bg-black/20 dark:text-white" placeholder="Recipient address" />
                            <input type="text" class="w-24 rounded-full border border-black/10 px-4 py-2 text-black dark:border-white/10 dark:bg-black/20 dark:text-white" placeholder="Amount" />
                        </div>
                    </div>
                    
                    <div class="flex justify-end">
                        <Button class="rounded-full bg-black text-white px-6 dark:bg-white dark:text-black">
                            Send Transaction
                            <ArrowRight class="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        {/if}
    </div>

    <div class="mx-auto mt-10 text-center">
        <Button size="lg" class="rounded-full bg-black text-white px-8 py-6 text-lg dark:bg-white dark:text-black">
            Try It Yourself
            <ArrowRight class="ml-2 h-5 w-5" />
        </Button>
    </div>
</section>
