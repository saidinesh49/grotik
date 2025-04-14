<script lang="ts">
    import { inview } from 'svelte-inview';
    import ShinyHeading from '$lib/components/ui/heading/ShinyHeading.svelte';
    import type { ObserverEventDetails } from 'svelte-inview';

    let inView = false;

    const handleChange = ({ detail }: CustomEvent<ObserverEventDetails>) => {
        inView = detail.inView;
    };

    const testimonials = [
        {
            content: "Thanks to Grotik, I can now understand financial terms in English while learning about investing. The AI conversations make practice fun and engaging!",
            author: "Maria Rodriguez",
            role: "Spanish Speaker",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
        },
        {
            content: "The Stellar blockchain simulations helped me understand international money transfers practically. It's amazing how they combine language learning with real financial skills.",
            author: "Chen Wei",
            role: "Mandarin Speaker",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chen"
        },
        {
            content: "I've tried many language learning apps, but Grotik's focus on financial literacy makes it unique. The personalized AI feedback is incredibly helpful.",
            author: "Amit Patel",
            role: "Hindi Speaker",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit"
        }
    ];
</script>

<section 
    id="testimonials"
    class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8"
    use:inview={{
        unobserveOnEnter: true,
        rootMargin: '-100px'
    }}
    on:inview_change={handleChange}
>
    <div class="mx-auto max-w-2xl text-center">
        <p class="text-base font-semibold leading-7 text-black/60 dark:text-white/60">Testimonials</p>
        <ShinyHeading size="lg" className="mt-2">
            Hear from our learners
        </ShinyHeading>
        <p class="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Join thousands of users who are mastering finance in their native language
        </p>
    </div>
    <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {#each testimonials as testimonial}
            <div class="flex flex-col justify-between {inView ? 'animate-fade-up' : ''} opacity-0">
                <div class="relative">
                    <div class="relative rounded-xl bg-white/5 p-6 shadow-sm ring-1 ring-white/10 backdrop-blur-sm">
                        <div class="flex items-center gap-x-4">
                            <img 
                                src={testimonial.image} 
                                alt={testimonial.author} 
                                class="size-12 rounded-full bg-gray-50"
                            />
                            <div>
                                <div class="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    {testimonial.author}
                                </div>
                                <div class="text-sm leading-6 text-gray-600 dark:text-gray-400">
                                    {testimonial.role}
                                </div>
                            </div>
                        </div>
                        <div class="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
                            {testimonial.content}
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</section>
