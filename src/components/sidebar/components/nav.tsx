import { LucideIcon, Trash } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { deleteChat } from '@/services/chat.service';
import { useAtom } from 'jotai';
import { chatAtom, defaultChat } from '@/store/chatAtom';
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
  const [chat, setChat] = useAtom(chatAtom);

  const deleteSelectedChat = async (chatId: number): Promise<void> => {
    try {
      await deleteChat(chatId);

      refetch();

      chat.id === chatId && setChat(defaultChat);
    } catch (error) {
      toast('Error deleting chat');
      console.error(error);
    }
  };

  return chats.length > 0 ? (
    <ScrollArea className='flex-grow p-4'>
      <nav className='grid gap-4 '>
        {chats.map((item, index) => (
          <ContextMenu>
            <ContextMenuTrigger>
              <Button key={index} variant='ghost' size='sm' className={cn(buttonVariants({ variant: 'ghost' }), item.id === chat.id && 'bg-muted', 'justify-start w-full')} onClick={() => onClick(item.id)}>
                <item.icon className='mr-2 h-4 w-4' />
                {item.title}
              </Button>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem className='flex gap-2' onClick={() => deleteSelectedChat(chat.id)}>
                <Trash className='w-4 h-4' />
                Delete {item.id}
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </nav>
    </ScrollArea>
  ) : (
    <div className='flex h-full justify-center items-center'>
      <p>No Chats</p>
    </div>
  );
}
