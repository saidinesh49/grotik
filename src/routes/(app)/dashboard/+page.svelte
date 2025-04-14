<script lang="ts">
    import { userStore } from '$lib/stores/auth';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { User, BookOpen, Activity, Coins, Brain, MessageCircle, BarChart3, ArrowRight, Clock } from 'lucide-svelte';
    import BorderBeam from '$lib/components/magic/borderbeam/BorderBeam.svelte';
    import { inview } from 'svelte-inview';
    import type { ObserverEventDetails } from 'svelte-inview';
    import Button from '$lib/components/ui/button/button.svelte';

    onMount(() => {
        if (!$userStore.user) {
            goto('/signin');
        }
    });

    let inView = {
        welcome: false,
        stats: false,
        activities: false,
        courses: false
    };

    const handleChange = (section: keyof typeof inView) => ({ detail }: CustomEvent<ObserverEventDetails>) => {
        inView[section] = detail.inView;
    };

    const learningStats = [
        { 
            icon: BookOpen, 
            label: 'Lessons Completed', 
            value: '12', 
            change: '+3 this week',
            color: 'bg-black text-white dark:bg-white dark:text-black'
        },
        { 
            icon: Activity, 
            label: 'Learning Streak', 
            value: '7 days', 
            change: 'Keep it up!',
            color: 'bg-black/10 text-black dark:bg-white/10 dark:text-white'
        },
        { 
            icon: MessageCircle, 
            label: 'AI Conversations', 
            value: '28', 
            change: '5 new today',
            color: 'bg-black/10 text-black dark:bg-white/10 dark:text-white'
        },
        { 
            icon: Coins, 
            label: 'Stellar Simulations', 
            value: '5', 
            change: 'Last: 2 hours ago',
            color: 'bg-black/10 text-black dark:bg-white/10 dark:text-white'
        }
    ];

    const recentActivities = [
        {
            type: 'conversation',
            icon: Brain,
            title: 'Spanish Banking Conversation',
            time: '2 hours ago',
            description: 'Discussed checking accounts and savings options in Spanish'
        },
        {
            type: 'transaction',
            icon: Coins,
            title: 'Stellar Transfer Simulation',
            time: '4 hours ago',
            description: 'Practiced sending 50 XLM to a family member account'
        },
        {
            type: 'lesson',
            icon: BookOpen,
            title: 'Investing Basics Lesson',
            time: '1 day ago',
            description: 'Completed lesson on investment terminology in Japanese'
        }
    ];

    const recommendedCourses = [
        {
            title: 'International Money Transfers',
            language: 'Spanish',
            progress: 30,
            lessons: 8,
            completed: 3
        },
        {
            title: 'Budgeting Essentials',
            language: 'French',
            progress: 15,
            lessons: 10,
            completed: 2
        },
        {
            title: 'Cryptocurrency Basics',
            language: 'English',
            progress: 0,
            lessons: 6,
            completed: 0
        }
    ];

    const languages = ['Spanish', 'French', 'Japanese', 'German', 'Chinese'];
    const activeLanguage = 'Spanish';
</script>

<svelte:head>
    <title>Dashboard | Grotik</title>
    <meta name="description" content="Your financial learning dashboard" />
</svelte:head>

<div class="container max-w-7xl px-4 py-12 sm:px-6">
    <!-- Welcome Section -->
    <div 
        use:inview={{
            unobserveOnEnter: true,
            rootMargin: '-100px'
        }}
        on:inview_change={handleChange('welcome')}
        class="relative mb-12 overflow-hidden rounded-3xl border border-black/10 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-black/20 {inView.welcome ? 'animate-fade-up' : ''} opacity-0"
    >
        <BorderBeam
            size={150}
            duration={10}
            delay={0}
            colorFrom="#f5f5f5"
            colorTo="#e0e0e0"
        />
        <div class="relative z-10">
            <div class="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div class="flex items-center gap-4">
                {#if $userStore.user?.photoURL}
                    <img
                        src={$userStore.user.photoURL}
                        alt="Profile"
                            class="size-16 rounded-full border-2 border-black/10 object-cover dark:border-white/10"
                    />
                {:else}
                        <div class="flex size-16 items-center justify-center rounded-full border-2 border-black bg-white dark:border-white dark:bg-black">
                            <User class="size-8 text-black dark:text-white" />
                    </div>
                {/if}
                <div>
                        <p class="text-sm text-black/60 dark:text-white/60">Welcome back</p>
                        <h2 class="text-2xl font-bold text-black dark:text-white">{$userStore.user?.displayName || 'User'}</h2>
                    </div>
                </div>
                
                <div class="flex w-full flex-wrap items-center gap-3 md:w-auto">
                    <div class="pill-button pill-button-secondary rounded-full">
                        <span class="mr-2 font-semibold">Active language:</span>
                        <select class="bg-transparent font-medium focus:outline-none">
                            {#each languages as language}
                                <option selected={language === activeLanguage}>{language}</option>
                            {/each}
                        </select>
                    </div>
                    <Button class="pill-button pill-button-primary rounded-full">
                        Start New Lesson
                    </Button>
                </div>
            </div>
        </div>
    </div>

    <!-- Stats Section -->
    <div 
        use:inview={{
            unobserveOnEnter: true,
            rootMargin: '-100px'
        }}
        on:inview_change={handleChange('stats')}
        class="mb-12 {inView.stats ? 'animate-fade-up' : ''} opacity-0"
        style="animation-delay: 100ms;"
    >
        <h3 class="mb-6 text-xl font-semibold text-black dark:text-white">Your Learning Stats</h3>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {#each learningStats as stat, i}
                <div 
                    class="flex flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md dark:border-white/10 dark:bg-black/20"
                    style="animation-delay: {i * 100}ms;"
                >
                    <div class="mb-4 flex items-center gap-3">
                        <div class="flex size-10 items-center justify-center rounded-xl {stat.color}">
                            <svelte:component this={stat.icon} class="size-5" />
                        </div>
                        <span class="text-sm font-medium text-black/60 dark:text-white/60">{stat.label}</span>
                    </div>
                    <div class="mt-auto">
                        <p class="text-2xl font-bold text-black dark:text-white">{stat.value}</p>
                        <p class="text-xs text-black/60 dark:text-white/60">{stat.change}</p>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Activities Section -->
    <div class="grid gap-8 lg:grid-cols-3">
        <div 
            use:inview={{
                unobserveOnEnter: true,
                rootMargin: '-100px'
            }}
            on:inview_change={handleChange('activities')}
            class="lg:col-span-1 {inView.activities ? 'animate-fade-up' : ''} opacity-0"
            style="animation-delay: 200ms;"
        >
            <div class="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-black/20">
                <div class="mb-6 flex items-center justify-between">
                    <h3 class="text-xl font-semibold text-black dark:text-white">Recent Activity</h3>
                    <Clock class="size-5 text-black/60 dark:text-white/60" />
                </div>
                
                <div class="space-y-6">
                    {#each recentActivities as activity, i}
                        <div 
                            class="animate-fade-up opacity-0"
                            style="animation-delay: {300 + i * 100}ms;"
                        >
                            <div class="flex gap-4">
                                <div class={`flex size-10 shrink-0 items-center justify-center rounded-full ${activity.type === 'conversation' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-black/10 text-black dark:bg-white/10 dark:text-white'}`}>
                                    <svelte:component this={activity.icon} class="size-5" />
                                </div>
                                <div>
                                    <div class="flex items-center">
                                        <h4 class="font-medium text-black dark:text-white">{activity.title}</h4>
                                        <span class="ml-2 text-xs text-black/60 dark:text-white/60">{activity.time}</span>
                                    </div>
                                    <p class="mt-1 text-sm text-black/80 dark:text-white/80">{activity.description}</p>
                                </div>
                            </div>
                            {#if i < recentActivities.length - 1}
                                <div class="my-4 h-px w-full bg-black/10 dark:bg-white/10"></div>
                            {/if}
                        </div>
                    {/each}
                </div>
            </div>
        </div>

        <!-- Courses Section -->
        <div 
            use:inview={{
                unobserveOnEnter: true,
                rootMargin: '-100px'
            }}
            on:inview_change={handleChange('courses')}
            class="lg:col-span-2 {inView.courses ? 'animate-fade-up' : ''} opacity-0"
            style="animation-delay: 400ms;"
        >
            <div class="rounded-2xl border border-black/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-black/20">
                <div class="mb-6 flex items-center justify-between">
                    <h3 class="text-xl font-semibold text-black dark:text-white">Continue Learning</h3>
                    <Button variant="outline" class="rounded-full border-black/10 px-4 text-sm dark:border-white/10">
                        View All Courses
                        <ArrowRight class="ml-1 size-4" />
                    </Button>
                </div>
                
                <div class="space-y-6">
                    {#each recommendedCourses as course, i}
                        <div 
                            class="animate-fade-up opacity-0"
                            style="animation-delay: {500 + i * 100}ms;"
                        >
                            <div class="flex flex-col rounded-xl border border-black/10 bg-black/5 p-5 transition-all duration-300 hover:shadow-md dark:border-white/10 dark:bg-white/5">
                                <div class="flex items-start justify-between gap-4">
                                    <div>
                                        <div class="flex items-center">
                                            <h4 class="font-medium text-black dark:text-white">{course.title}</h4>
                                            <span class="ml-2 rounded-full bg-black/10 px-2 py-0.5 text-xs font-medium dark:bg-white/10">{course.language}</span>
                                        </div>
                                        <p class="mt-1 text-sm text-black/60 dark:text-white/60">{course.completed} of {course.lessons} lessons completed</p>
                                    </div>
                                    <Button class="rounded-full bg-black px-4 py-1 text-sm text-white dark:bg-white dark:text-black">
                                        {course.progress > 0 ? 'Continue' : 'Start'}
                                    </Button>
                                </div>
                                
                                {#if course.progress > 0}
                                    <div class="mt-4 h-2 w-full overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                                        <div class="h-full rounded-full bg-black dark:bg-white" style="width: {course.progress}%"></div>
                                    </div>
                                {/if}
                            </div>
                        </div>
        {/each}
                </div>
            </div>
        </div>
    </div>

    <!-- Learning Path Visualization -->
    <div 
        class="mt-12 animate-fade-up rounded-2xl border border-black/10 bg-white p-6 opacity-0 shadow-sm dark:border-white/10 dark:bg-black/20"
        style="animation-delay: 700ms;"
    >
        <div class="mb-6 flex items-center justify-between">
            <div>
                <h3 class="text-xl font-semibold text-black dark:text-white">Learning Path</h3>
                <p class="text-sm text-black/60 dark:text-white/60">Track your progress through financial literacy</p>
            </div>
            <div class="flex items-center gap-4">
                <div class="flex items-center">
                    <Brain class="mr-2 size-5 text-black dark:text-white" />
                    <span class="text-sm font-medium text-black dark:text-white">Groq AI</span>
                </div>
                <div class="flex items-center">
                    <Coins class="mr-2 size-5 text-black dark:text-white" />
                    <span class="text-sm font-medium text-black dark:text-white">Stellar</span>
                </div>
            </div>
        </div>
        
        <div class="relative mt-8 h-24 w-full">
            <!-- Path visualization with connected nodes -->
            <div class="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-black/10 dark:bg-white/10"></div>
            
            <!-- Completed path -->
            <div class="absolute left-0 top-1/2 h-1 w-[50%] -translate-y-1/2 bg-black dark:bg-white"></div>
            
            <!-- Completed Nodes -->
            <div class="absolute left-[5%] top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-black text-xs font-bold text-white dark:border-white dark:bg-white dark:text-black z-10">1</div>
            <div class="absolute left-[20%] top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-black text-xs font-bold text-white dark:border-white dark:bg-white dark:text-black z-10">2</div>
            <div class="absolute left-[35%] top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-black text-xs font-bold text-white dark:border-white dark:bg-white dark:text-black z-10">3</div>
            
            <!-- Current Node -->
            <div class="absolute left-[50%] top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black bg-white text-xs font-bold text-black dark:border-white dark:bg-black dark:text-white z-10">4</div>
            <div class="absolute left-[50%] top-[calc(50%+20px)] w-32 -translate-x-1/2 text-center text-xs font-medium text-black dark:text-white z-10">Current Lesson</div>
            
            <!-- Upcoming Nodes -->
            <div class="absolute left-[65%] top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black/40 bg-white text-xs font-bold text-black/40 dark:border-white/40 dark:bg-black dark:text-white/40 z-10">5</div>
            <div class="absolute left-[80%] top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black/40 bg-white text-xs font-bold text-black/40 dark:border-white/40 dark:bg-black dark:text-white/40 z-10">6</div>
            <div class="absolute left-[95%] top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-black/40 bg-white text-xs font-bold text-black/40 dark:border-white/40 dark:bg-black dark:text-white/40 z-10">7</div>
        </div>
    </div>
</div> 