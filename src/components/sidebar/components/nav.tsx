import { LucideIcon, Trash } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { deleteChat } from '@/services/chat.service';
import { useAtom } from 'jotai';
import { currentChatIdAtom } from '@/store/chatAtom';
import { cn } from '@/lib/utils';

interface NavProps {
  chats: {
    id: number;
    title: string;
    icon: LucideIcon;
  }[];
  refetch: Function;
  onClick: (id: number) => void;
}

export function Nav({ chats, refetch, onClick }: NavProps) {
  const [currentChatId, setCurrentChatId] = useAtom(currentChatIdAtom);

  const deleteSelectedChat = async (chatId: number): Promise<void> => {
    try {
      await deleteChat(chatId);

      refetch();

      currentChatId && currentChatId === chatId && setCurrentChatId(undefined);
    } catch (error) {
      toast('Error deleting chat');
    }
  };

  return chats.length > 0 ? (
    <ScrollArea className='flex-grow p-4'>
      <nav className='grid gap-4 '>
        {chats.map((item, index) => (
          <ContextMenu>
            <ContextMenuTrigger>
              <Button key={index} variant='ghost' size='sm' className={cn(buttonVariants({ variant: 'ghost' }), currentChatId && item.id === currentChatId && 'bg-muted', 'justify-start w-full')} onClick={() => onClick(item.id)}>
                <item.icon className='mr-2 h-4 w-4' />
                {item.title}
              </Button>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem className='flex gap-2' onClick={() => deleteSelectedChat(item.id)}>
                <Trash className='w-4 h-4' />
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </nav>
    </ScrollArea>
  ) : (
    <div className='h-full ' />
  );
}
