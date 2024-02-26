import { Settings } from '@/components/settings/settings.component';
import { Nav } from '@/components/sidebar/components/nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button, buttonVariants } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { MessagesSquare } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className='flex flex-col min-w-[350px] h-full'>
      <Button variant='ghost' className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'justify-start', 'p-2', 'm-2')}>
        <div className='flex item-center w-full justify-between'>
          <span>New Chat</span>
          <Pencil2Icon />
        </div>
      </Button>
      <div className='flex-grow'>
        <Separator />
        <Nav
          links={[
            {
              title: 'Untitled Chat',
              icon: MessagesSquare,
              variant: 'ghost',
            },
            {
              title: 'Untitled Chat',
              icon: MessagesSquare,
              variant: 'ghost',
            },
            {
              title: 'Untitled Chat',
              icon: MessagesSquare,
              variant: 'ghost',
            },
            {
              title: 'Untitled Chat',
              icon: MessagesSquare,
              variant: 'ghost',
            },
            {
              title: 'Untitled Chat',
              icon: MessagesSquare,
              variant: 'ghost',
            },
          ]}
        />
      </div>
      <Separator />
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='ghost' className={cn(buttonVariants({ variant: 'ghost', size: 'lg' }), 'justify-start', 'p-2', 'm-2')}>
            <div className='flex items-center space-x-4'>
              <Avatar>
                <AvatarImage src='/avatars/01.png' />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div>
                <p className='text-lg font-medium leading-none text-left'>Sofia Davis</p>
              </div>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className='min-w-[800px]'>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>Manage your account settings and set e-mail preferences.</DialogDescription>
          </DialogHeader>
          <Separator />
          <Settings />
        </DialogContent>
      </Dialog>
    </div>
  );
}
