import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

const ollamaFormSchema = z.object({
  path: z.string(),
});

type OllamaFormValues = z.infer<typeof ollamaFormSchema>;

const defaultValuesOllama: Partial<OllamaFormValues> = {
  path: 'http://localhost:11434/api',
};

const modelFormSchema = z.object({
  query: z.string(),
});

type ModelFormValues = z.infer<typeof modelFormSchema>;

const defaultValuesModel: Partial<ModelFormValues> = {
  query: '',
};

export function ModelForm() {
  const ollamaForm = useForm<OllamaFormValues>({
    resolver: zodResolver(ollamaFormSchema),
    defaultValues: defaultValuesOllama,
  });

  function onSubmitOllama(data: OllamaFormValues) {
    alert({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const modelForm = useForm<ModelFormValues>({
    resolver: zodResolver(modelFormSchema),
    defaultValues: defaultValuesModel,
  });

  function onSubmitModel(data: ModelFormValues) {
    alert({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <ScrollArea>
      <Form {...ollamaForm}>
        <form onSubmit={ollamaForm.handleSubmit(onSubmitOllama)} className='flex flex-col space-y-8'>
          <FormField
            control={ollamaForm.control}
            name='path'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ollama API Path</FormLabel>
                <FormControl>
                  <Input placeholder='URL' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='self-end' type='submit'>
            Update
          </Button>
        </form>
      </Form>
      <Form {...modelForm}>
        <form onSubmit={modelForm.handleSubmit(onSubmitModel)} className='flex flex-col space-y-8'>
          <FormField
            control={modelForm.control}
            name='query'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Search Model</FormLabel>
                <FormControl>
                  <Input placeholder='Type the name of the model' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='self-end' type='submit'>
            Download
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
}
