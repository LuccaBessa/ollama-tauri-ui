import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OllamaService } from '@/services/ollama.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ModelResponse } from '@/services/models/model';
import { Loader, Trash } from 'lucide-react';

export function ModelForm() {
  const getInstalledModelsList = async (): Promise<ModelResponse> => {
    try {
      return await OllamaService.getAllInstalledModels();
    } catch (error) {
      return { models: [] };
    }
  };

  const { data, refetch } = useQuery<ModelResponse>({
    queryKey: ['models'],
    queryFn: getInstalledModelsList,
  });

  const deleteInstalledModel = async (name: string): Promise<void> => {
    try {
      OllamaService.deleteInstalledVersion(name);
      refetch();
    } catch (error) {
      toast(`Deleting ${name} failed`);
    }
  };

  const deleteModelMutation = useMutation({
    mutationKey: ['modelsDelete'],
    mutationFn: deleteInstalledModel,
  });

  const downloadModel = async (name: string): Promise<void> => {
    try {
      OllamaService.downloadVersion(name);
      modelForm.reset();
      refetch();
    } catch (error) {
      toast(`Download ${name} failed`);
    }
  };

  const downloadModelMutation = useMutation({
    mutationKey: ['modelsDownload'],
    mutationFn: downloadModel,
  });

  const ollamaFormSchema = z.object({
    path: z.string(),
  });

  type OllamaFormValues = z.infer<typeof ollamaFormSchema>;

  const defaultValuesOllama: Partial<OllamaFormValues> = {
    path: localStorage.getItem('base_ollama_url')!,
  };

  const modelFormSchema = z.object({
    query: z.string(),
  });

  type ModelFormValues = z.infer<typeof modelFormSchema>;

  const defaultValuesModel: Partial<ModelFormValues> = {
    query: '',
  };

  const ollamaForm = useForm<OllamaFormValues>({
    resolver: zodResolver(ollamaFormSchema),
    defaultValues: defaultValuesOllama,
  });

  function onSubmitOllama(data: OllamaFormValues) {
    localStorage.setItem('base_ollama_url', data.path);
    toast('Ollama API path updated');
  }

  const modelForm = useForm<ModelFormValues>({
    resolver: zodResolver(modelFormSchema),
    defaultValues: defaultValuesModel,
  });

  function onSubmitModel(data: ModelFormValues) {
    downloadModelMutation.mutate(data.query);
  }

  return (
    <div className='flex flex-col px-1'>
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
                <FormLabel>Download Model</FormLabel>
                <FormControl>
                  <Input placeholder='Type the name of the model' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='self-end' type='submit' disabled={downloadModelMutation.isPending}>
            {downloadModelMutation.isPending ? <Loader className='h-4 w-4 animate-spin' /> : 'Download'}
          </Button>
        </form>
      </Form>
      <Table className='mt-6'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Model</TableHead>
            <TableHead>Format</TableHead>
            <TableHead>Parameter Size</TableHead>
            <TableHead className='text-right'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.models &&
            data?.models.length > 0 &&
            data?.models.map((model) => (
              <TableRow key={model.name}>
                <TableCell className='font-medium'>{model.name}</TableCell>
                <TableCell>{model.details.format}</TableCell>
                <TableCell>{model.details.parameter_size}</TableCell>
                <TableCell>
                  <Button variant='ghost' size='icon'>
                    <Trash className='h-4 w-4' onClick={() => deleteModelMutation.mutate(model.name)} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {!data?.models || (data?.models.length === 0 && <p className='self-center mt-4'>No models installed</p>)}
    </div>
  );
}
