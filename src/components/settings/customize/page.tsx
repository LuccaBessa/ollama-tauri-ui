import { CustomizeForm } from '@/components/settings/customize/customize-form';
import { Separator } from '@/components/ui/separator';

export default function SettingsCustomizePage() {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium'>Profile</h3>
        <p className='text-sm text-muted-foreground'>This is how the models will get context about you.</p>
      </div>
      <Separator />
      <CustomizeForm />
    </div>
  );
}
