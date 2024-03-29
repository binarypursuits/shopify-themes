import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AlertMessageProps } from '../components/alert';
import Theme from '../components/theme-table/theme-model';
import useChromeStorage from './use-chrome-storage';
import { StoreForm } from '../components/store-settings/add-edit-store-form';

export interface Store {
  name: string;
  title: string;
  baseUrl: string;
  domain?: string;
  token: string;
  themes: Theme[];
  updatedAt: number;
}

export interface StoreContextState {
  alert: AlertMessageProps | undefined;
  shopifyStores: Store[];
  activeStore: string;
  form: Partial<StoreForm>;
  getForm: () => Partial<StoreForm>;
  setForm: (form: Partial<StoreForm>) => void;
  getStore: (name: string) => Store;
  addStore: (data: Store) => void;
  updateStore: (data: Store) => void;
  removeStore: (name: string) => void;
  setActiveStore: (name: string) => void;
  getActiveStore: () => Store | undefined;
  setAlert: (alert: AlertMessageProps | undefined) => void;
}

interface ShopifyTheme {
  admin_graphql_api_id: string;
  created_at: string;
  id: number;
  name: string;
  previewable: boolean;
  processing: boolean;
  role: string;
  theme_store_id: number;
  updated_at: string;
}

interface ShopifyStoreThemeResponse {
  themes?: ShopifyTheme[];
  errors?: string;
}

export const StoreContext = createContext<StoreContextState | null>(null);

export const useStoreContext = () => useContext(StoreContext);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider = ({ children }: StoreProviderProps) => {
  const { getSettings, saveSettings } = useChromeStorage();
  const [stores, setStores] = useState<Store[]>([]);
  const [form, setFormData] = useState<Partial<StoreForm>>({});
  const [alert, setAlert] = useState<AlertMessageProps | undefined>();
  const [activeStore, setActiveStore] = useState<string>("");

  const getActiveStore = () => {
    const s = stores.find((s) => s.name === activeStore);
    return s;
  };

  async function sendStoreThemeMessage(storeName: string, storeToken: string) {
    const response = await chrome.runtime.sendMessage({
      contentScriptQuery: 'get-theme-list',
      storeName,
      storeToken,
    }) as ShopifyStoreThemeResponse;
  
    if (response.errors || !response.themes) {
      setAlert({ alertSeverity: 'error', alertText: response.errors as string });
      return false;
    }
  
    const themes = [] as Theme[];
    
    response.themes.forEach((t: ShopifyTheme) => themes.push({
      id: `${t.id}`,
      name: t.name,
      role: t.role,
      createdAt: t.created_at,
      updatedAt: t.updated_at,
      published: t.role === 'main' ? true : false,
    }))
  
    return themes;
  }
  
  const addStore = async (data: Store) => {
    const themes = await sendStoreThemeMessage(data.name, data.token);
    if (!themes) {
      throw new Error();
    }

    data.themes = themes;
    data.updatedAt = Date.now();
    setStores([...stores, data]);
    setActiveStore(data.name);
  };

  const getStore = (name: string) => {
    const requestedStore = stores.find((s) => s.name === name);
    if (!requestedStore) {
      throw new Error(
        `Invalid Shopify store name [${name}] passed to getStore()`
      );
    }

    return requestedStore;
  };

  const removeStore = (name: string) => {
    const otherStores = stores.filter((s) => s.name !== name);
    setStores([...otherStores]);
    if (otherStores.length > 0) {
      setActiveStore(otherStores[0].name);
    } else {
      setActiveStore("");
    }
  };

  const updateStore = async (data: Store) => {
    const otherStores = stores.filter((s) => s.name !== data.name);
    const themes = await sendStoreThemeMessage(data.name, data.token);

    if (!themes) {
      throw new Error();
    }

    data.themes = themes;
    data.updatedAt = Date.now();
    setStores([...otherStores, data]);
    setActiveStore(data.name);
  };

  const getForm = () => {
    return form;
  }

  const setForm = (form: Partial<StoreForm>) => {
    console.log('setForm: ', form);
    setFormData(form);
  }

  useEffect(() => {
    getSettings().then((settings) => {
      setStores(settings.stores);
      setActiveStore(settings.activeStore);
      setForm(settings.form);

      const hasFormData = (settings.form?.title || settings.form?.store || settings.form?.token || settings.form?.domain);
      if (!settings.activeStore && settings.stores.length > 0 && !hasFormData) {
        setActiveStore(settings.stores[0].name);
      }
    });
  }, []);

  // get chrome extension local storage and set state using setStores
  useEffect(() => {
    (async () => {
      await saveSettings({ stores, form, activeStore });
    })();
  }, [stores, activeStore, form, saveSettings]);

  return (
    <StoreContext.Provider
      value={{
        alert,
        shopifyStores: stores,
        activeStore,
        form,
        addStore,
        updateStore,
        getStore,
        removeStore,
        setActiveStore,
        getActiveStore,
        getForm,
        setForm,
        setAlert
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
