import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Loader } from 'lucide-react';
import { useState } from 'react';
import { OllamaService } from '@/services/ollama.service';
import { Button } from '@/components/ui/button';
import { ModelResponse } from '@/services/models/model';
import { useQuery } from '@tanstack/react-query';

interface IProps {
  model?: string;
  setModel: Function;
}

export default function ModelCombobox({ model, setModel }: IProps) {
  const [open, setOpen] = useState(false);

  const getInstalledModelsList = async (): Promise<ModelResponse> => {
    try {
      return await OllamaService.getAllInstalledModels();
    } catch (error) {
      return { models: [] };
    }
  };

  const { data, isLoading, isFetching } = useQuery<ModelResponse>({
    queryKey: ['models-combobox'],
    queryFn: getInstalledModelsList,
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
          {model ? data?.models.find((item) => item.name === model)?.name : 'Select model...'}
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
              data.models.map((item) => (
                <CommandItem
                  key={item.name}
                  value={item.name}
                  onSelect={(currentValue) => {
                    setModel(currentValue);
                    setOpen(false);
                  }}
                >
                  <Check className={cn('mr-2 h-4 w-4', model === item.name ? 'opacity-100' : 'opacity-0')} />
                  {item.name}
                </CommandItem>
              ))}
            {(isLoading || isFetching) && <Loader className='h-4 w-4 animate-spin mx-auto' />}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
