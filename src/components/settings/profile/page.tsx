import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './profile-form';
import { SidebarNav } from '../components/sidebar-nav';

export default function SettingsProfilePage() {
  return (
    <SidebarNav>
      <div className='space-y-6'>
        <div>
          <h3 className='text-lg font-medium'>Profile</h3>
          <p className='text-sm text-muted-foreground'>This is how the models will get context about you.</p>
        </div>
        <Separator />
        <ProfileForm />
      </div>
    </SidebarNav>
  );
}
