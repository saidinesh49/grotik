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
            console.log('Course ID:', courseId);
            console.log('Content Index:', contentIndex);
            
            if (contentIndex !== -1) {
                courseContent = courseContentData[contentIndex];
                console.log('Course Content:', courseContent);
                
                if (courseContent && courseContent.check_your_understanding) {
                    // Ensure check_your_understanding is an array
                    if (Array.isArray(courseContent.check_your_understanding)) {
                        questions = courseContent.check_your_understanding;
                        console.log('Quiz Questions:', questions);
                        // Initialize answered questions array
                        answeredQuestions = new Array(questions.length).fill(false);
                    } else {
                        console.error('check_your_understanding is not an array:', courseContent.check_your_understanding);
                        error = true;
                    }
                } else {
                    console.log('No quiz questions found in course content');
                }
            } else {
                console.log('Course ID not found in content map');
                error = true;
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
        console.log('Selected Answer:', answer);
    }

    function checkAnswer() {
        if (!questions[currentQuestionIndex]) {
            console.log('No question at current index:', currentQuestionIndex);
            return;
        }
        
        const question = questions[currentQuestionIndex];
        console.log('Checking answer for question:', question);
        console.log('Selected Answer:', selectedAnswer);
        console.log('Short Answer:', shortAnswer);
        
        let correct = false;
        
        if (question.type === 'multiple_choice' || question.type === 'true_false') {
            correct = selectedAnswer === question.answer;
            console.log('Correct Answer:', question.answer);
            console.log('Is Correct:', correct);
        } else if (question.type === 'short_answer') {
            // Simple string matching for short answers
            correct = shortAnswer.toLowerCase().trim() === question.answer.toLowerCase().trim();
            console.log('Correct Answer:', question.answer);
            console.log('Is Correct:', correct);
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
        console.log('Next Question clicked');
        console.log('Current Index:', currentQuestionIndex);
        console.log('Questions Length:', questions.length);
        
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            selectedAnswer = '';
            shortAnswer = '';
            showFeedback = false;
            console.log('Moving to next question, new index:', currentQuestionIndex);
        } else {
            quizCompleted = true;
            console.log('Quiz completed');
        }
    }
    
    function previousQuestion() {
        console.log('Previous Question clicked');
        console.log('Current Index:', currentQuestionIndex);
        
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            selectedAnswer = '';
            shortAnswer = '';
            showFeedback = false;
            console.log('Moving to previous question, new index:', currentQuestionIndex);
        }
    }

    function restartQuiz() {
        console.log('Restarting quiz');
        currentQuestionIndex = 0;
        selectedAnswer = '';
        shortAnswer = '';
        score = 0;
        quizCompleted = false;
        showFeedback = false;
        answeredQuestions = new Array(questions.length).fill(false);
    }

    function getCurrentQuestion() {
        if (!questions || !Array.isArray(questions) || questions.length === 0) {
            return { question: 'No question available', type: 'multiple_choice', options: [], answer: '' };
        }
        
        const question = questions[currentQuestionIndex] || questions[0];
        console.log('Current Question:', question);
        return question;
    }

    function getProgressPercentage() {
        if (!questions || !Array.isArray(questions) || questions.length === 0) {
            return 0;
        }
        
        const percentage = ((currentQuestionIndex + 1) / questions.length) * 100;
        console.log('Progress Percentage:', percentage);
        return percentage;
    }
    
    function getAnsweredCount() {
        if (!answeredQuestions || !Array.isArray(answeredQuestions)) {
            return 0;
        }
        
        const count = answeredQuestions.filter(Boolean).length;
        console.log('Answered Questions Count:', count);
        return count;
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
    {:else if !questions || questions.length === 0}
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
                
                {#if getCurrentQuestion().type === 'multiple_choice'}
                    <div class="space-y-3 mb-6">
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
                    </div>
                {:else if getCurrentQuestion().type === 'true_false'}
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
                {:else if getCurrentQuestion().type === 'short_answer'}
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
                    <div class="alert {isCorrect ? 'alert-success' : 'alert-error'} mb-6" in:fly={{ y: 10, duration: 300 }}>
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