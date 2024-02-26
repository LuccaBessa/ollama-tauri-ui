import SettingsModelPage from '@/components/settings/models/page';
import SettingsAppearancePage from '@/components/settings/appearance/page';
import SettingsProfilePage from '@/components/settings/profile/page';
import { type ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const Settings = (): ReactElement => {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' index element={<SettingsProfilePage />} />
        <Route path='/appearance' element={<SettingsAppearancePage />} />
        <Route path='/models' element={<SettingsModelPage />} />
      </Routes>
    </BrowserRouter>
  );
};
