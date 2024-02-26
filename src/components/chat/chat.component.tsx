import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export default function Chat() {
  return (
    <div className='flex flex-col gap-4 p-4 w-full h-full'>
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
      <section className='flex flex-col px-8 h-full'>
        <div className='flex-grow'></div>
        <div className='flex flex-row items-center w-full gap-2'>
          <Textarea placeholder='Type your message here.' />
          <Button>Send</Button>
        </div>
      </section>
    </div>
  );
}
