import Chat from '@/components/chat/chat.component';
import Sidebar from '@/components/sidebar/sidebar.component';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/sonner';
import { OllamaService } from '@/services/ollama.service';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const healthCheckOllama = async (): Promise<void> => {
    try {
      return await OllamaService.healthCheck();
    } catch (error) {
      toast('Error connecting to Ollama API', { description: localStorage.getItem('base_ollama_url') });
    }
  };

  useEffect(() => {
    const baseOllamaURL = localStorage.getItem('base_ollama_url');

    if (!baseOllamaURL) {
      localStorage.setItem('base_ollama_url', 'http://localhost:11434');
    }

    healthCheckOllama();
  }, []);

  return (
    <>
      <main className='flex h-full'>
        <Sidebar isOpen={isSidebarOpen} />
        {isSidebarOpen && <Separator orientation='vertical' />}
        <Chat setIsSidebarOpen={setIsSidebarOpen} />
      </main>
      <Toaster />
    </>
  );
}
