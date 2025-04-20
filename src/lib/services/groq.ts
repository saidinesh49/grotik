import { Groq } from 'groq-sdk';

// Initialize Groq client
const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY || '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'
});

// Quiz generation function
export async function generateQuiz(topic: string, difficulty: 'easy' | 'medium' | 'hard' = 'medium', count: number = 5) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a financial education expert creating quizzes for a learning platform. 
          Create ${count} multiple-choice questions about ${topic} at ${difficulty} difficulty level.
          Each question should have 4 options with one correct answer.
          Format your response as a valid JSON object with the following structure:
          {
            "questions": [
              {
                "question": "Question text here",
                "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
                "correct": "Correct option text here",
                "explanation": "Brief explanation of why this is the correct answer"
              }
            ]
          }`
        }
      ],
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false
    });

    // Extract the content from the response
    const content = chatCompletion.choices[0]?.message?.content || '';
    
    // Parse the JSON response
    try {
      const quizData = JSON.parse(content);
      return quizData;
    } catch (error) {
      console.error('Error parsing Groq response:', error);
      throw new Error('Failed to parse quiz data from Groq API');
    }
  } catch (error) {
    console.error('Error generating quiz with Groq:', error);
    throw new Error('Failed to generate quiz with Groq API');
  }
}

// Course content generation function
export async function generateCourseContent(topic: string, outline: string) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `You are a financial education expert creating course content for a learning platform.
          Create detailed, engaging content for a course about ${topic} based on the following outline:
          ${outline}
          
          Format your response as a valid JSON object with the following structure:
          {
            "title": "Course title",
            "description": "Course description",
            "modules": [
              {
                "title": "Module title",
                "description": "Module description",
                "lessons": [
                  {
                    "title": "Lesson title",
                    "content": "Detailed lesson content in markdown format"
                  }
                ]
              }
            ]
          }`
        }
      ],
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      temperature: 0.7,
      max_tokens: 2048,
      top_p: 1,
      stream: false
    });

    // Extract the content from the response
    const content = chatCompletion.choices[0]?.message?.content || '';
    
    // Parse the JSON response
    try {
      const courseData = JSON.parse(content);
      return courseData;
    } catch (error) {
      console.error('Error parsing Groq response:', error);
      throw new Error('Failed to parse course data from Groq API');
    }
  } catch (error) {
    console.error('Error generating course content with Groq:', error);
    throw new Error('Failed to generate course content with Groq API');
  }
} 