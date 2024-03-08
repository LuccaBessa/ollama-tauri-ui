import ModelCombobox from '@/components/chat/components/model-combobox.component';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Chat as IChat, ChatRequestOptions, ChatResponse, Message } from '@/services/models/chat';
import { OllamaService } from '@/services/ollama.service';
import { currentChatIdAtom, defaultChat } from '@/store/chatAtom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { Check, Clipboard, Loader, Menu, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useEffect, useRef, useState } from 'react';
import { addMessage, createChat, getChat } from '@/services/chat.service';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface IProps {
  setIsSidebarOpen: Function;
}

const chatFormSchema = z.object({
  message: z.string(),
});

type ChatFormValues = z.infer<typeof chatFormSchema>;

const defaultValues: Partial<ChatFormValues> = {
  message: '',
};

export default function Chat({ setIsSidebarOpen }: IProps) {
  const [currentModel, setCurrentModel] = useState<string | undefined>(undefined);
  const [currentChat, setCurrentChat] = useState<IChat | undefined>(undefined);
  const [wasCopied, setWasCopied] = useState<boolean>(false);
  const scrollAreaRef = useRef<any>(null);

  const [currentChatId, setCurrentChatId] = useAtom(currentChatIdAtom);
  const queryClient = useQueryClient();

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  };

  const chatForm = useForm<ChatFormValues>({
    resolver: zodResolver(chatFormSchema),
    defaultValues,
  });

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setWasCopied(true);
    setTimeout(() => setWasCopied(false), 1000);
  };

  const saveMessage = async (data: ChatResponse | undefined): Promise<void> => {
    try {
      if (data) {
        await addMessage(currentChatId!, data.message.role, data.message.content);
        refetch();
      }
    } catch (error) {
      toast('Error saving model message');
      console.error(error);
    }
  };

  const saveMessageMutation = useMutation({
    mutationKey: ['savemessage'],
    mutationFn: saveMessage,
  });

  const sendMessage = async (content: string): Promise<ChatResponse | undefined> => {
    try {
      scrollToBottom();

      const message: Message = {
        role: 'user',
        content,
      };

      let chatRequestOptions: ChatRequestOptions;

      if (!currentChatId) {
        const newChatId = await createChat('Untitled chat', currentModel!);

        setCurrentChatId(newChatId);

        queryClient.refetchQueries({ queryKey: ['chats'] });

        chatRequestOptions = {
          model: currentModel!,
          messages: [message],
          stream: false,
        };

        await addMessage(newChatId, message.role, message.content);
      } else {
        await addMessage(currentChatId, message.role, message.content);
        refetch();

        chatRequestOptions = {
          model: currentModel!,
          messages: [...currentChat!.messages, message],
          stream: false,
        };
      }

      return await OllamaService.generateChatCompletion(chatRequestOptions);
    } catch (error) {
      toast('Error saving/creating chat');
    } finally {
      chatForm.reset();
    }
  };

  const onSendMessageSuccess = (data: ChatResponse | undefined) => {
    saveMessageMutation.mutate(data);
  };

  const sendMessageMutation = useMutation({
    mutationKey: ['sendMessage'],
    mutationFn: sendMessage,
    onSuccess: onSendMessageSuccess,
  });

  function onSubmitChat(data: ChatFormValues) {
    sendMessageMutation.mutateAsync(data.message);
  }

  const getChatInfo = async (id: number | undefined): Promise<IChat> => {
    try {
      if (id) {
        const response = await getChat(id);

        if (response) {
          setCurrentChat(response);
          setCurrentModel(response.model);
          return response;
        }
      } else {
        setCurrentChat(undefined);
        setCurrentModel(undefined);
      }

      return defaultChat;
    } catch (error) {
      toast('Error loading current chat');
      return defaultChat;
    }
  };

  const { refetch } = useQuery<IChat>({
    queryKey: ['chat', currentChatId],
    queryFn: () => getChatInfo(currentChatId),
  });

  useEffect(() => {
    currentChat && currentModel && currentModel !== '' && setCurrentModel(currentChat.model);
  }, [currentChat]);

  return (
    <div className='flex flex-col gap-4 p-4 w-full h-screen bg-[url("/ollama.png")] bg-no-repeat bg-center dark:bg-[url("/ollama_white.png")]'>
      <div className='flex gap-4'>
        <Button variant='ghost' size='icon' onClick={() => setIsSidebarOpen((prev: boolean) => !prev)}>
          <Menu />
        </Button>
        <ModelCombobox model={currentModel} setModel={setCurrentModel} />
      </div>
      <ScrollArea ref={scrollAreaRef} className='flex-grow gap-2 p-4 w-[60%] mx-auto'>
        {currentChat &&
          currentChat.messages.map((message, index) => (
            <div key={index} className={cn('flex w-fit max-w-[60%] flex-col gap-2 rounded-lg px-3 py-2 text-sm mb-4 ', message.role === 'user' ? 'ml-auto bg-primary text-primary-foreground' : 'bg-muted')}>
              {message.role === 'user' ? (
                message.content
              ) : (
                <ReactMarkdown
                  components={{
                    code(props) {
                      const { children, className, node, ref, ...rest } = props;
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <>
                          <div className='flex justify-between'>
                            <p className='my-auto'>{match ? match[1] : ''}</p>
                            <button className='flex gap-2' onClick={() => copyToClipboard(String(children))}>
                              {wasCopied ? (
                                <>
                                  <Check className='w-4 h-4 my-auto' />
                                  Copied!
                                </>
                              ) : (
                                <>
                                  <Clipboard className='w-4 h-4 my-auto' />
                                  Copy code
                                </>
                              )}
                            </button>
                          </div>
                          <SyntaxHighlighter {...rest} PreTag='div' wrapLongLines children={String(children).replace(/\n$/, '')} language={match[1]} style={atomDark} />
                        </>
                      ) : (
                        <code {...rest} className={className}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          ))}
        {sendMessageMutation.isPending && (
          <div className={cn('flex w-fit max-w-[60%] flex-col gap-2 rounded-lg px-3 py-2 text-sm mb-4 ', 'bg-muted')}>
            <Loader className='h-4 w-4 animate-spin' />
          </div>
        )}
      </ScrollArea>
      <Form {...chatForm}>
        <form onSubmit={chatForm.handleSubmit(onSubmitChat)} className='flex flex-row items-center w-[60%] mx-auto gap-2'>
          <FormField
            control={chatForm.control}
            name='message'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input placeholder='Message model...' disabled={currentModel === '' || !currentModel} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit' size='icon' disabled={currentModel === '' || !currentModel || sendMessageMutation.isPending}>
            <Send className='h-6 w-6' />
          </Button>
        </form>
      </Form>
    </div>
  );
}
