import { Separator } from '@/components/ui/separator';
import { ModelForm } from './models-form';
import { JSX } from 'react';

export default function SettingsModelPage(): JSX.Element {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Models</h3>
        <p className="text-sm text-muted-foreground">
          Manage your models. Download and configure ollama.
        </p>
      </div>
      <Separator />
      <ModelForm />
    </div>
  );
}
