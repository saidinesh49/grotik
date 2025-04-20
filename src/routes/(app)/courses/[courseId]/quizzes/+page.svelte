<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import { fade, fly } from 'svelte/transition';
    import { userStore, isAuthenticated } from '$lib/stores/auth';
    import Button from '$lib/components/ui/button/button.svelte';
    import { ArrowLeft, BookOpen, Brain, Check, X, ChevronLeft, ChevronRight } from 'lucide-svelte';
    import { page } from '$app/stores';
    import courseContentData from '$lib/data/course-content.json';
    import confetti from 'canvas-confetti';

    let courseId = $page.params.courseId;
    let courseContent: any = null;
    let questions: any[] = [];
    let currentQuestionIndex = 0;
    let selectedAnswer = '';
    let shortAnswer = '';
    let score = 0;
    let quizCompleted = false;
    let loading = true;
    let error = false;
    let showFeedback = false;
    let isCorrect = false;
    let feedbackMessage = '';
    let answeredQuestions: boolean[] = [];

    onMount(async () => {
        if (!$isAuthenticated) {
            goto('/signin');
            return;
        }

        try {
            // Find the corresponding content from the course-content.json file
            const contentIndex = getContentIndex(courseId);
            if (contentIndex !== -1) {
                courseContent = courseContentData[contentIndex];
                if (courseContent && courseContent.check_your_understanding) {
                    questions = courseContent.check_your_understanding;
                    // Initialize answered questions array
                    answeredQuestions = new Array(questions.length).fill(false);
                }
            }
        } catch (err) {
            console.error('Error loading quiz questions:', err);
            error = true;
        } finally {
            loading = false;
        }
    });

    function getContentIndex(courseId: string): number {
        // Map course IDs to content indices
        const contentMap: Record<string, number> = {
            'basic-banking': 0,
            'credit-management': 1,
            'investment-basics': 2
        };
        
        return contentMap[courseId] ?? -1;
    }

    function goBack() {
        // Navigate back to the course page
        goto(`/courses/${courseId}`);
    }

    function goToCourse() {
        goto(`/courses/${courseId}`);
    }

    function handleVoiceCommand(command: string) {
        const lowerCommand = command.toLowerCase();
        
        if (lowerCommand.includes('next') || lowerCommand.includes('continue')) {
            nextQuestion();
        } else if (lowerCommand.includes('back') || lowerCommand.includes('previous')) {
            previousQuestion();
        } else if (lowerCommand.includes('restart') || lowerCommand.includes('start over')) {
            restartQuiz();
        } else if (lowerCommand.includes('check') || lowerCommand.includes('submit')) {
            checkAnswer();
        } else if (lowerCommand.includes('return') || lowerCommand.includes('go back')) {
            goToCourse();
        }
    }

    function selectAnswer(answer: string) {
        selectedAnswer = answer;
    }

    function checkAnswer() {
        if (!questions[currentQuestionIndex]) return;
        
        const question = questions[currentQuestionIndex];
        let correct = false;
        
        if (question.type === 'multiple_choice' || question.type === 'true_false') {
            correct = selectedAnswer === question.answer;
        } else if (question.type === 'short_answer') {
            // Simple string matching for short answers
            correct = shortAnswer.toLowerCase().trim() === question.answer.toLowerCase().trim();
        }
        
        isCorrect = correct;
        feedbackMessage = correct ? 'Correct!' : `Incorrect. The correct answer is: ${question.answer}`;
        showFeedback = true;
        
        if (correct) {
            score++;
            // Trigger confetti for correct answers
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
        
        // Mark this question as answered
        answeredQuestions[currentQuestionIndex] = true;
    }

    function nextQuestion() {
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            // Reset answer state based on the new question type
            const nextQuestion = questions[currentQuestionIndex];
            if (nextQuestion.type === 'multiple_choice' || nextQuestion.type === 'true_false') {
                selectedAnswer = '';
            } else if (nextQuestion.type === 'short_answer') {
                shortAnswer = '';
            }
            showFeedback = false;
        } else {
            quizCompleted = true;
        }
    }
    
    function previousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            // Reset answer state based on the previous question type
            const prevQuestion = questions[currentQuestionIndex];
            if (prevQuestion.type === 'multiple_choice' || prevQuestion.type === 'true_false') {
                selectedAnswer = '';
            } else if (prevQuestion.type === 'short_answer') {
                shortAnswer = '';
            }
            showFeedback = false;
        }
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        // Reset answer state based on the first question type
        const firstQuestion = questions[0];
        if (firstQuestion.type === 'multiple_choice' || firstQuestion.type === 'true_false') {
            selectedAnswer = '';
        } else if (firstQuestion.type === 'short_answer') {
            shortAnswer = '';
        }
        score = 0;
        quizCompleted = false;
        showFeedback = false;
        answeredQuestions = new Array(questions.length).fill(false);
    }

    function getCurrentQuestion() {
        const question = questions[currentQuestionIndex] || null;
        console.log("Current question data:", question);
        console.log("Question type:", question?.type);
        return question;
    }

    function getProgressPercentage() {
        return ((currentQuestionIndex + 1) / questions.length) * 100;
    }
    
    function getAnsweredCount() {
        return answeredQuestions.filter(Boolean).length;
    }
</script>

<div class="container mx-auto px-4 py-8" in:fade>
    <div class="mb-6 flex items-center justify-between">
        <div class="flex items-center gap-2">
            <button 
                class="btn btn-circle btn-ghost btn-sm" 
                on:click={goBack}
                aria-label="Go back"
            >
                <ArrowLeft class="h-5 w-5" />
            </button>
            <h1 class="text-3xl font-bold">Course Quiz</h1>
        </div>
    </div>

    {#if error}
        <div class="alert alert-error">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Failed to load quiz. Please try again later.</span>
        </div>
    {:else if loading}
        <div class="flex justify-center items-center h-64">
            <div class="loading loading-spinner loading-lg"></div>
        </div>
    {:else if questions.length === 0}
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="card-title">No Quiz Available</h2>
                <p>There are no quiz questions available for this course yet.</p>
                <div class="card-actions justify-end">
                    <Button 
                        variant="primary" 
                        on:click={goToCourse}
                        class="gap-2"
                    >
                        <BookOpen class="h-4 w-4" />
                        Return to Course
                    </Button>
                </div>
            </div>
        </div>
    {:else if quizCompleted}
        <div class="card bg-base-100 shadow-xl" in:fly={{ y: 20, duration: 500 }}>
            <div class="card-body">
                <h2 class="card-title">Quiz Completed!</h2>
                <div class="flex flex-col items-center justify-center py-8">
                    <div class="text-6xl font-bold mb-4">{score}/{questions.length}</div>
                    <div class="text-xl mb-6">
                        {#if score === questions.length}
                            Perfect score! Excellent work!
                        {:else if score >= questions.length * 0.8}
                            Great job! You've mastered most of the material.
                        {:else if score >= questions.length * 0.6}
                            Good effort! You've learned a lot.
                        {:else}
                            Keep studying! You'll improve with practice.
                        {/if}
                    </div>
                    <div class="flex gap-4">
                        <Button 
                            variant="primary" 
                            on:click={restartQuiz}
                            class="gap-2"
                        >
                            <Brain class="h-4 w-4" />
                            Try Again
                        </Button>
                        <Button 
                            variant="outline" 
                            on:click={goToCourse}
                            class="gap-2"
                        >
                            <BookOpen class="h-4 w-4" />
                            Return to Course
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    {:else}
        <div class="card bg-base-100 shadow-xl" in:fly={{ y: 20, duration: 500 }}>
            <div class="card-body">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="card-title">Question {currentQuestionIndex + 1} of {questions.length}</h2>
                    <div class="badge badge-primary">{Math.round(getProgressPercentage())}% Complete</div>
                </div>
                
                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div class="bg-primary h-2.5 rounded-full" style="width: {getProgressPercentage()}%"></div>
                </div>
                
                <div class="mb-6">
                    <p class="text-lg font-medium">{getCurrentQuestion().question}</p>
                </div>
                
                {#if getCurrentQuestion()?.type === 'multiple_choice'}
                    <div class="space-y-3 mb-6">
                        {#if getCurrentQuestion()?.options && Array.isArray(getCurrentQuestion()?.options)}
                            {#each getCurrentQuestion().options as option}
                                <label class="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-base-200 transition-colors {selectedAnswer === option ? 'border-primary bg-primary/10' : ''}">
                                    <input 
                                        type="radio" 
                                        name="answer" 
                                        value={option} 
                                        bind:group={selectedAnswer}
                                        class="radio radio-primary mr-3"
                                    />
                                    <span>{option}</span>
                                </label>
                            {/each}
                        {/if}
                    </div>
                {:else if getCurrentQuestion()?.type === 'true_false'}
                    <div class="grid grid-cols-2 gap-4 mb-6">
                        <label class="flex items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-base-200 transition-colors {selectedAnswer === 'True' ? 'border-primary bg-primary/10' : ''}">
                            <input 
                                type="radio" 
                                name="answer" 
                                value="True" 
                                bind:group={selectedAnswer}
                                class="radio radio-primary mr-3"
                            />
                            <span>True</span>
                        </label>
                        <label class="flex items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-base-200 transition-colors {selectedAnswer === 'False' ? 'border-primary bg-primary/10' : ''}">
                            <input 
                                type="radio" 
                                name="answer" 
                                value="False" 
                                bind:group={selectedAnswer}
                                class="radio radio-primary mr-3"
                            />
                            <span>False</span>
                        </label>
                    </div>
                {:else if getCurrentQuestion()?.type === 'short_answer'}
                    <div class="mb-6">
                        <input 
                            type="text" 
                            placeholder="Type your answer here" 
                            bind:value={shortAnswer}
                            class="input input-bordered w-full"
                        />
                    </div>
                {/if}
                
                {#if showFeedback}
                    <div class="alert {isCorrect ? 'alert-success' : 'alert-error'} mb-6 {isCorrect ? 'text-green-400' : 'text-red-400'}" in:fly={{ y: 10, duration: 300 }}>
                        {#if isCorrect}
                            <Check class="h-5 w-5" />
                        {:else}
                            <X class="h-5 w-5" />
                        {/if}
                        <span>{feedbackMessage}</span>
                    </div>
                    
                    {#if getCurrentQuestion().explanation}
                        <div class="bg-base-200 p-4 rounded-lg mb-6">
                            <p class="font-medium">Explanation:</p>
                            <p>{getCurrentQuestion().explanation}</p>
                        </div>
                    {/if}
                {/if}
                
                <div class="card-actions justify-between">
                    <div>
                        {#if currentQuestionIndex > 0}
                            <Button 
                                variant="outline" 
                                on:click={previousQuestion}
                                class="gap-2"
                            >
                                <ChevronLeft class="h-4 w-4" />
                                Previous
                            </Button>
                        {/if}
                    </div>
                    
                    <div>
                        {#if !showFeedback}
                            <Button 
                                variant="primary" 
                                on:click={checkAnswer}
                                disabled={!selectedAnswer && !shortAnswer}
                                class="gap-2"
                            >
                                <Check class="h-4 w-4" />
                                Check Answer
                            </Button>
                        {:else}
                            <Button 
                                variant="primary" 
                                on:click={nextQuestion}
                                class="gap-2"
                            >
                                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                                <ChevronRight class="h-4 w-4" />
                            </Button>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div> 