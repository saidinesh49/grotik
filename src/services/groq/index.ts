import { ChatConfig, ChatResponse, LearningContent, Message } from '@/types/groq';

export class GroqService {
  private config: ChatConfig;

  constructor(config: ChatConfig) {
    this.config = config;
  }

  async generateLearningContent(
    language: string,
    financialConcept: string,
    difficulty: LearningContent['difficulty']
  ): Promise<LearningContent> {
    const prompt = `Create a language learning lesson about ${financialConcept} in ${language} at ${difficulty} level. Include practical exercises.`;
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
          model: this.config.model,
          temperature: this.config.temperature ?? 0.7,
          maxTokens: this.config.maxTokens,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate learning content');
      }

      const data = await response.json();
      return this.parseLearningContent(data.message.content);
    } catch (error) {
      console.error('Error generating learning content:', error);
      throw error;
    }
  }

  private parseLearningContent(content: string): LearningContent {
    // Implementation to parse AI response into structured content
    // This is a placeholder - actual implementation would depend on
    // the exact format of responses from the Groq API
    return {
      lesson: 'Sample Lesson',
      difficulty: 'beginner',
      language: 'English',
      financialConcept: 'Budgeting',
      content: content,
      exercises: [],
    };
  }

  async chat(messages: Message[]): Promise<ChatResponse> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages,
          model: this.config.model,
          temperature: this.config.temperature ?? 0.7,
          maxTokens: this.config.maxTokens,
        }),
      });

      if (!response.ok) {
        throw new Error('Chat request failed');
      }

      const data = await response.json();
      return {
        message: data.message,
        done: true,
      };
    } catch (error) {
      console.error('Error in chat:', error);
      throw error;
    }
  }
}

export const createGroqService = (config: ChatConfig): GroqService => {
  return new GroqService(config);
};
