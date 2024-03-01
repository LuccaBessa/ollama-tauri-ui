import { buttonVariants } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import packageJson from '../../../../package.json';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { CircleDot } from 'lucide-react';

export default function SettingsAboutPage() {
  return (
    <div className='flex flex-col w-full lg:h-[475px] justify-center items-center gap-6'>
      <img
        alt='Logo'
        className='rounded-lg'
        height='128'
        width='128'
        src='/logo.png'
        style={{
          objectFit: 'cover',
        }}
      />
      <div className='flex flex-col justify-center items-center gap-4'>
        <h3 className='scroll-m-20 text-4xl font-semibold tracking-tight'>OllamaUI</h3>
        <p className='text-lg text-muted-foreground'>Version: {packageJson.version}</p>
      </div>
      <div className='flex justify-center items-center'>
        <div className='flex space-x-4 text-lg'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a className={buttonVariants({ variant: 'ghost', size: 'icon' })} href='https://github.com/LuccaBessa/ollama-tauri-ui' target='_blank'>
                  <GitHubLogoIcon className='h-6 w-6' />
                </a>
              </TooltipTrigger>
              <TooltipContent>Visit GitHub</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a className={buttonVariants({ variant: 'ghost', size: 'icon' })} href='https://github.com/LuccaBessa/ollama-tauri-ui/issues/new' target='_blank'>
                  <CircleDot className='h-6 w-6' />
                </a>
              </TooltipTrigger>
              <TooltipContent>Open Issue</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
