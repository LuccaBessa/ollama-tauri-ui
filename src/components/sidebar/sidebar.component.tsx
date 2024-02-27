import { Settings } from '@/components/settings/settings.component';
import { Nav } from '@/components/sidebar/components/nav';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { createChat, getAllChats } from '@/services/chat.service';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { LucideIcon, MessagesSquare, Settings as SettingsIcon } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';

export default function Sidebar() {
  const getChatsList = async (): Promise<ChatSummary[]> => {
    try {
      return await getAllChats();
    } catch (error) {
      toast('Error loading chats');
      return [];
    }
  };

  const { data, refetch } = useQuery<ChatSummary[]>({
    queryKey: ['chats'],
    queryFn: getChatsList,
  });

  const createNewChat = async (): Promise<void> => {
    try {
      await createChat('Untitled chat');

      refetch();
    } catch (error) {
      toast('Error creating new chat');
      console.error(error);
    }
  };

  const createNewChatMutation = useMutation({
    mutationKey: ['newchat'],
    mutationFn: createNewChat,
  });

  const chatSummaryList: { id: number; title: string; icon: LucideIcon }[] = useMemo(() => {
    return data && data.length > 0
      ? data!.map((cs) => ({
          id: cs.id,
          title: cs.name,
          icon: MessagesSquare,
          variant: 'ghost',
        }))
      : [];
  }, [data]);

  return (
    <div className='flex flex-col w-[300px] h-screen'>
      <Button variant='ghost' className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'justify-start', 'p-2', 'm-2')} onClick={() => createNewChatMutation.mutate()}>
        <div className='flex item-center w-full justify-between'>
          <span>New Chat</span>
          <Pencil2Icon />
        </div>
      </Button>
      <Separator />
      <Nav chats={chatSummaryList} refetch={refetch} />
      <Separator />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='ghost' className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'justify-start', 'p-2', 'm-2')}>
            <div className='flex items-center space-x-4'>
              <Avatar>
                <AvatarFallback>
                  <SettingsIcon />
                </AvatarFallback>
              </Avatar>
              <div>
                <p className='text-lg font-medium leading-none text-left'>Settings</p>
              </div>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className='min-w-[800px] min-h-[625px]'>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Manage OllamaUI settings and ollama preferences.</DialogDescription>
          </DialogHeader>
          <Separator />
          <Settings />
        </DialogContent>
      </Dialog>
    </div>
  );
}
