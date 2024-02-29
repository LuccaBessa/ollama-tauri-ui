import { http } from '@/lib/axios';
import { ChatRequestOptions, ChatResponse } from '@/services/models/chat';
import { ModelResponse } from '@/services/models/model';

export class OllamaService {
  static async healthCheck(): Promise<void> {
    try {
      await http.get('/');
      console.log('Health check successful.');
    } catch (error) {
      console.error('Health check failed:', error);
      throw new Error('Service is currently unavailable.');
    }
  }

  static async getAllInstalledModels(): Promise<ModelResponse> {
    try {
      const response = await http.get<ModelResponse>('/api/tags');
      return response.data;
    } catch (error) {
      console.error('Failed to retrieve installed models:', error);
      throw new Error('Unable to fetch models.');
    }
  }

  static async deleteInstalledVersion(name: string): Promise<void> {
    try {
      await http.delete('/api/delete', { data: { name } });
      console.log(`Model ${name} deleted successfully.`);
    } catch (error) {
      console.error(`Failed to delete model ${name}:`, error);
      throw new Error(`Unable to delete model ${name}.`);
    }
  }

  static async downloadVersion(name: string): Promise<void> {
    try {
      await http.post('/api/pull', { name });
      console.log(`Model ${name} downloaded successfully.`);
    } catch (error) {
      console.error(`Failed to download model ${name}:`, error);
      throw new Error(`Unable to download model ${name}.`);
    }
  }

  static async generateChatCompletion(options: ChatRequestOptions): Promise<ChatResponse> {
    try {
      const response = await http.post<ChatResponse>('/api/chat', options);
      console.log('Chat completion generated successfully.');
      return response.data;
    } catch (error) {
      console.error('Failed to generate chat completion:', error);
      throw new Error('Unable to generate chat completion.');
    }
  }
}
