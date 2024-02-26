import Chat from '@/components/chat/chat.component';
import Sidebar from '@/components/sidebar/sidebar.component';
import { ThemeProvider } from '@/components/theme-provider';
import { Separator } from '@/components/ui/separator';

export default function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <main className='flex h-full'>
        <Sidebar />
        <Separator orientation='vertical' />
        <Chat />
      </main>
    </ThemeProvider>
  );
}
