import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/',
  },
  {
    title: 'Models',
    href: '/models',
  },
  {
    title: 'Appearance',
    href: '/appearance',
  },
];

export function SidebarNav({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <>
      <div className='md:hidden'>
        <img src='/examples/forms-light.png' width={1280} height={791} alt='Forms' className='block dark:hidden' />
        <img src='/examples/forms-dark.png' width={1280} height={791} alt='Forms' className='hidden dark:block' />
      </div>
      <div className='hidden space-y-6 p-2 pb-16 md:block h-[500px]'>
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 lg:w-1/5'>
            <nav className={cn('flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1', className)} {...props}>
              {sidebarNavItems.map((item) => (
                <Link key={item.href} to={item.href} className={cn(buttonVariants({ variant: 'ghost' }), 'test' === item.href ? 'bg-muted hover:bg-muted' : 'hover:bg-transparent hover:underline', 'justify-start')}>
                  {item.title}
                </Link>
              ))}
            </nav>
          </aside>
          <div className='flex-1 lg:max-w-2xl px-2'>{children}</div>
        </div>
      </div>
    </>
  );
}
