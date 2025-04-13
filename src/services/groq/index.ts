interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatParams {
  messages: Message[];
  onChunk?: (chunk: string) => void;
  onComplete?: (fullResponse: string) => void;
}

export async function chat({ messages, onChunk, onComplete }: ChatParams) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      throw new Error('Chat request failed');
    }

    // For streaming responses
    if (onChunk && response.body) {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          onComplete?.(fullResponse);
          break;
        }

        const text = decoder.decode(value);
        fullResponse += text;
        onChunk(text);
      }
      return fullResponse;
    }

    // For non-streaming responses
    const text = await response.text();
    onComplete?.(text);
    return text;
  } catch (error) {
    console.error('Groq chat error:', error);
    throw error;
  }
}

export const defaultSystemPrompt = `You are a helpful AI tutor specializing in teaching languages through financial concepts. Your responses should:

1. Be clear and educational
2. Use financial examples when teaching language
3. Adapt to the user's language level
4. Provide cultural context when relevant
5. Encourage practical application

Keep responses concise and focused on the learning objective.`;

export const createLanguageLessonPrompt = (
  language: string,
  topic: string,
  level: 'beginner' | 'intermediate' | 'advanced'
) => `Create a ${level} level lesson in ${language} about ${topic}.
Include:
- Key vocabulary
- Example sentences
- Practice exercises
- Cultural context

Focus on financial terminology and real-world usage.`;
