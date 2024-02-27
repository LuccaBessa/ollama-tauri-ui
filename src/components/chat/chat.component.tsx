import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send } from 'lucide-react';

export default function Chat() {
  return (
    <div className='flex flex-col gap-4 p-4 w-full h-full bg-[url("/ollama.png")] bg-no-repeat bg-center dark:bg-[url("/ollama_white.png")]'>
      <Select>
        <SelectTrigger className='w-[180px]'>
          <SelectValue placeholder='Select a model' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Models</SelectLabel>
            <SelectItem value='apple'>Apple</SelectItem>
            <SelectItem value='banana'>Banana</SelectItem>
            <SelectItem value='blueberry'>Blueberry</SelectItem>
            <SelectItem value='grapes'>Grapes</SelectItem>
            <SelectItem value='pineapple'>Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <section className='flex flex-col h-full w-[60%] mx-auto '>
        <div className='flex-grow'></div>
        <div className='flex flex-row items-center w-full gap-2'>
          <Input placeholder='Message model...' />
          <Button size='icon'>
            <Send />
          </Button>
        </div>
      </section>
    </div>
  );
}
