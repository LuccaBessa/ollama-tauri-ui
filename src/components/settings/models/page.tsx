import { Separator } from '@/components/ui/separator';
import { ModelForm } from './models-form';
import { SidebarNav } from '../components/sidebar-nav';

export default function SettingsModelPage() {
  return (
    <SidebarNav>
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-medium'>Models</h3>
          <p className='text-sm text-muted-foreground'>Manage your models. Download and configure ollama.</p>
        </div>
        <Separator />
        <ModelForm />
      </div>
    </SidebarNav>
  );
}
