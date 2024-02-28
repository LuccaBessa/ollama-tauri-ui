import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { chatAtom } from '@/store/chatAtom';
import { cn } from '@/lib/utils';
import { useAtom } from 'jotai';
import { Check, ChevronsUpDown, Loader, Send } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ModelResponse } from '@/services/models/model';
import { OllamaService } from '@/services/ollama.service';

export default function Chat() {
  const [chat, setChat] = useAtom(chatAtom);

  const [open, setOpen] = useState(false);

  const getInstalledModelsList = async (): Promise<ModelResponse> => {
    try {
      return await OllamaService.getAllInstalledModels();
    } catch (error) {
      return { models: [] };
    }
  };

  const { data, isLoading, isFetching } = useQuery<ModelResponse>({
    queryKey: ['models-dropdown'],
    queryFn: getInstalledModelsList,
  });

  return (
    <div className='flex flex-col gap-4 p-4 w-full h-full bg-[url("/ollama.png")] bg-no-repeat bg-center dark:bg-[url("/ollama_white.png")]'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
            {chat?.model ? data?.models.find((framework) => framework.name === chat.model)?.name : 'Select model...'}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[200px] p-0'>
          <Command>
            <CommandInput placeholder='Search model...' />
            <CommandEmpty>No model found.</CommandEmpty>
            <CommandGroup>
              {data &&
                data.models.length > 0 &&
                data.models.map((model) => (
                  <CommandItem
                    key={model.name}
                    value={model.name}
                    onSelect={(currentValue) => {
                      setChat({ ...chat, model: currentValue });
                      setOpen(false);
                    }}
                  >
                    <Check className={cn('mr-2 h-4 w-4', chat?.model === model.name ? 'opacity-100' : 'opacity-0')} />
                    {model.name}
                  </CommandItem>
                ))}
              {isLoading || (isFetching && <Loader className='h-4 w-4 animate-spin mx-auto' />)}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      <section className='flex flex-col h-full w-[60%] mx-auto '>
        <div className='flex-grow'></div>
        <div className='flex flex-row items-center w-full gap-2'>
          <Input placeholder='Message model...' disabled={chat.model === ''} />
          <Button size='icon' disabled={chat.model === ''}>
            <Send className='h-6 w-6' />
          </Button>
        </div>
      </section>
    </div>
  );
}
