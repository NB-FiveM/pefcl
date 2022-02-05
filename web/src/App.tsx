import React, { useEffect, useState } from 'react';
import './App.css';
import { useNuiEvent } from './hooks/useNuiEvent';
import { debugData } from './utils/debugData';
import { BankContainer, BankWrapper } from './components/BankContainer';
import { CircularProgress } from '@mui/material';
import AccountsSidebar from './features/accounts/AccountsSidebar';
import BankDetails from './features/details/BankDetails';
import { useTranslation } from 'react-i18next';
import { useConfigValue } from './states/bank';
import { SidebarWrapper } from './styles/Sidebar.styles';
import { SnackbarProvider } from 'notistack';

debugData([
  {
    action: 'setVisible',
    data: true,
  },
]);

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { i18n } = useTranslation();

  useNuiEvent<boolean>('setVisible', (data) => {
    setIsVisible(data);
  });

  const config = useConfigValue();

  useEffect(() => {
    i18n.changeLanguage(config.locale).catch((e) => console.error(e));
  }, [i18n, config]);

  return (
    <>
      {isVisible && (
        <SnackbarProvider maxSnack={2}>
          <BankWrapper>
            <BankContainer>
              <SidebarWrapper>
                <React.Suspense fallback={<CircularProgress />}>
                  <AccountsSidebar />
                </React.Suspense>
              </SidebarWrapper>
              <div style={{ paddingTop: 20 }}>
                <React.Suspense fallback={<CircularProgress />}>
                  <BankDetails />
                </React.Suspense>
              </div>
            </BankContainer>
          </BankWrapper>
        </SnackbarProvider>
      )}
    </>
  );
};

export default App;
