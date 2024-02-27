import { http } from '@/lib/axios';
import { ModelResponse } from '@/services/models/model';

export class OllamaService {
  static async getAllInstalledModels(): Promise<ModelResponse> {
    const response = await http.get('/tags');
    return response.data;
  }

  static async deleteInstalledVersion(name: string): Promise<void> {
    await http.delete('/delete', { data: { name } });
  }

  static async downloadVersion(name: string): Promise<void> {
    await http.post('/pull', { name });
  }
}
