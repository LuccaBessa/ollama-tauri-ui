import { LucideIcon, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { deleteChat } from '@/services/chat.service';

interface NavProps {
  chats: {
    id: number;
    title: string;
    icon: LucideIcon;
  }[];
  refetch: Function;
}

export function Nav({ chats, refetch }: NavProps) {
  const deleteSelectedChat = async (chatId: number): Promise<void> => {
    try {
      await deleteChat(chatId);

      refetch();
    } catch (error) {
      toast('Error deleting chat');
      console.error(error);
    }
  };

  const deleteChatMutation = useMutation({
    mutationKey: ['deletechat'],
    mutationFn: deleteSelectedChat,
  });

  return chats.length > 0 ? (
    <ScrollArea className='flex-grow p-4'>
      <nav className='grid gap-4 '>
        {chats.map((chat, index) => (
          <ContextMenu>
            <ContextMenuTrigger>
              <Button key={index} variant='ghost' size='sm' className='justify-start w-full'>
                <chat.icon className='mr-2 h-4 w-4' />
                {chat.id} {chat.title}
              </Button>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem className='flex gap-2' onClick={() => deleteChatMutation.mutate(chat.id)}>
                <Trash className='w-4 h-4' />
                Delete
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
