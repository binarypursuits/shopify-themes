import { useState, useEffect } from 'react';
import Header from './components/header';
import StoreSettings from './components/store-settings';
import { useStoreContext, StoreContextState } from './hooks/use-stores-context';
import { Paper } from '@mui/material';
import StoreThemes from './components/store-themes';

import './App.css';
import AlertMessage from './components/alert';

function App() {
  const { activeStore, setActiveStore } = useStoreContext() as StoreContextState;
  const [showSettings, setShowSettings] = useState<boolean>(false);

  useEffect(() => {
    if (activeStore) {
      setShowSettings(false);
    } else {
      setShowSettings(true);
    }
  
  }, [activeStore, setShowSettings])

  const handleOnSettingsClicked = () => {
    setActiveStore('');
  }

  return (
      <div className="app">
        <AlertMessage />
        <Paper elevation={3} sx={{ px: 2, pb: 2, pt: 1, backgroundColor: '#e2e2e2' }}>
          <Header onSettingsClicked={handleOnSettingsClicked} />
          {showSettings === true ? <StoreSettings /> : <StoreThemes name={activeStore} />}
        </Paper>
      </div>
  );
}

export default App;
