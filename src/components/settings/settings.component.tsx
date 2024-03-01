import SettingsModelPage from '@/components/settings/models/page';
import SettingsAppearancePage from '@/components/settings/appearance/page';
// import SettingsCustomizePage from '@/components/settings/customize/page';
import { useState, type ReactElement } from 'react';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import SettingsAboutPage from '@/components/settings/about/page';

export const Settings = (): ReactElement => {
  const [selectedPage, setSelectedPage] = useState('/models');

  const sidebarNavItems = [
    // {
    //   title: 'Customize',
    //   href: '/customize',
    //   component: SettingsCustomizePage,
    // },
    {
      title: 'Models',
      href: '/models',
      component: SettingsModelPage,
    },
    {
      title: 'Appearance',
      href: '/appearance',
      component: SettingsAppearancePage,
    },
    {
      title: 'About',
      href: '/about',
      component: SettingsAboutPage,
    },
  ];

  return (
    <div className='hidden space-y-6 p-2 md:block'>
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 h-full'>
        <aside className='-mx-4 lg:w-1/5'>
          <nav className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1')}>
            {sidebarNavItems.map((item) => (
              <Button variant='ghost' key={item.href} className={cn(buttonVariants({ variant: 'ghost' }), selectedPage === item.href ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline', 'justify-start')} onClick={() => setSelectedPage(item.href)}>
                {item.title}
              </Button>
            ))}
          </nav>
        </aside>
        <ScrollArea className='flex-1 lg:max-w-2xl p-4 h-[510px]'>{sidebarNavItems.filter((item) => item.href === selectedPage)[0].component()}</ScrollArea>
      </div>
    </div>
  );
};
