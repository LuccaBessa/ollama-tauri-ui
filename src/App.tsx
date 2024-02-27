import Chat from '@/components/chat/chat.component';
import Sidebar from '@/components/sidebar/sidebar.component';
import { ThemeProvider } from '@/components/theme-provider';
import { Separator } from '@/components/ui/separator';
import { Toaster } from '@/components/ui/sonner';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    const baseOllamaURL = localStorage.getItem('base_ollama_url');

    if (!baseOllamaURL) {
      localStorage.setItem('base_ollama_url', 'http://localhost:11434/api');
    }
  }, []);

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <main className='flex h-full'>
        <Sidebar />
        <Separator orientation='vertical' />
        <Chat />
      </main>
      <Toaster />
    </ThemeProvider>
  );
}
