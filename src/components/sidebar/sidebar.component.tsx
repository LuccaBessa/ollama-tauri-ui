import { Settings } from '@/components/settings/settings.component';
import { Nav } from '@/components/sidebar/components/nav';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { getAllChats, getChat } from '@/services/chat.service';
import { ChatSummary } from '@/services/models/chat';
import { currentChatIdAtom } from '@/store/chatAtom';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { LucideIcon, MessagesSquare, Settings as SettingsIcon } from 'lucide-react';
import { useMemo } from 'react';
import { toast } from 'sonner';

interface IProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: IProps) {
  const [_, setCurrentChatId] = useAtom(currentChatIdAtom);

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

  const getChatInfo = async (id: number): Promise<void> => {
    try {
      const response = await getChat(id);

      response && setCurrentChatId(response.id);
    } catch (error) {
      toast('Error loading current chat');
    }
  };

  const chatSummaryList: { id: number; title: string; icon: LucideIcon }[] = useMemo(() => {
    return data
      ? data!.map((cs) => ({
          id: cs.id,
          title: cs.name,
          icon: MessagesSquare,
          variant: 'ghost',
        }))
      : [];
  }, [data]);

  return (
    <Collapsible open={isOpen} defaultOpen>
      <CollapsibleContent>
        <div className='flex flex-col w-[300px] h-screen'>
          <Button variant='ghost' className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'justify-start', 'p-2', 'm-2')} onClick={() => setCurrentChatId(undefined)}>
            <div className='flex item-center w-full justify-between'>
              <span>New Chat</span>
              <Pencil2Icon />
            </div>
          </Button>
          <Separator />
          <Nav chats={chatSummaryList} refetch={refetch} onClick={(id: number) => getChatInfo(id)} />
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
      </CollapsibleContent>
    </Collapsible>
  );
}
