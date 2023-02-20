import { useState, useEffect } from 'react';
import Header from './components/header';
import StoreSettings from './components/store-settings';
import { useStoreContext, StoreContextState } from './hooks/use-stores-context';
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
        <Header onSettingsClicked={handleOnSettingsClicked} />
        {showSettings === true ? <StoreSettings /> : <StoreThemes name={activeStore} />}
      </div>
  );
}

export default App;
