import { LucideIcon, Pencil, Trash, X } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from '@/components/ui/context-menu';
import { deleteChat, updateChatName } from '@/services/chat.service';
import { useAtom } from 'jotai';
import { currentChatIdAtom } from '@/store/chatAtom';
import { cn } from '@/lib/utils';
import { KeyboardEvent, useState } from 'react';
import { Input } from '@/components/ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

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
  const [selectedChat, setSelectedChat] = useState<number | null>();
  const [title, setTitle] = useState<string>('');
  const [isRenaming, setIsRenaming] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const deleteSelectedChat = async (chatId: number): Promise<void> => {
    try {
      await deleteChat(chatId);

      refetch();

      currentChatId && currentChatId === chatId && setCurrentChatId(undefined);
    } catch (error) {
      toast('Error deleting chat');
    }
  };

  const updateChatTitle = async (chatId: number, name: string): Promise<void> => {
    try {
      await updateChatName(chatId, name);
      setSelectedChat(undefined);
      refetch();
    } catch (error) {
      toast('Error saving model message');
      console.error(error);
    }
  };

  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.key === 'Enter') {
      if (title !== '') {
        await updateChatTitle(selectedChat!, title);
      }
      setSelectedChat(undefined);
      setTitle('');
      setIsRenaming(false);
    }
  };

  return chats.length > 0 ? (
    <>
      <ScrollArea className='flex-grow p-4'>
        <nav className='grid gap-4 '>
          {chats.map((item, index) => (
            <ContextMenu>
              <ContextMenuTrigger>
                {selectedChat === item.id && isRenaming ? (
                  <div className='flex gap-2 m-1'>
                    <Input
                      placeholder='Choose a name...'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      onKeyUp={(e) => handleKeyPress(e)}
                      onBlur={() => {
                        if (title === item.title) {
                          setSelectedChat(undefined);
                          setIsRenaming(false);
                        }
                      }}
                    />
                    <Button
                      variant='ghost'
                      size='icon'
                      onClick={() => {
                        setSelectedChat(undefined);
                        setTitle('');
                        setIsRenaming(false);
                      }}
                    >
                      <X className='h-3 w-3' />
                    </Button>
                  </div>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Button key={index} variant='ghost' size='sm' className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), currentChatId && item.id === currentChatId && 'bg-muted', 'flex justify-start w-[265px] gap-2')} onClick={() => onClick(item.id)}>
                          <item.icon className='h-4 w-4' />
                          <span className='text-ellipsis overflow-hidden'>{item.title}</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side='right'>{item.title}</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  className='flex gap-2'
                  onClick={() => {
                    setSelectedChat(item.id);
                    setTitle(item.title);
                    setIsRenaming(true);
                  }}
                >
                  <Pencil className='w-4 h-4' />
                  Rename
                </ContextMenuItem>
                <ContextMenuItem
                  className='flex gap-2'
                  onClick={() => {
                    setSelectedChat(item.id);
                    setOpen(true);
                  }}
                >
                  <Trash className='w-4 h-4' />
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          ))}
        </nav>
      </ScrollArea>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Chat</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently delete this chat.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className={cn(buttonVariants({ variant: 'destructive' }))} onClick={() => deleteSelectedChat(selectedChat!)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  ) : (
    <div className='h-full ' />
  );
}
