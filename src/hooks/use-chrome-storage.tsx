import { StoreForm } from '../components/store-settings/add-edit-store-form';
import { Store } from './use-stores-context';

const key = 'BPST';

export interface ShopifyThemesSettings {
  stores: Store[];
  form: Partial<StoreForm>;
  activeStore: string;
}

function useChromeStorage() {

    const getSettings = (): Promise<ShopifyThemesSettings> => {
        return new Promise(function(resolve, reject) {
            chrome.storage.local.get([key], (value) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                }

                if (!value[key]) {
                    return {
                      store: [],
                      form: {
                        domain: '',
                        store: '',
                        title: '',
                        token: ''
                      },
                      activeStore: ''
                    };
                }

                resolve(value[key] as ShopifyThemesSettings);
            });
        });
    }

    const saveSettings = (settings: ShopifyThemesSettings) => {
        if (settings.stores.length === 0 && !settings.activeStore && !settings.form?.domain && !settings.form.title
          && !settings.form.store && !settings.form.token) {
          return;
        }

        return new Promise(function(resolve, reject) {
            chrome.storage.local.set({ [key]: settings }, () => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                }

                resolve(true);
            });
        });
    }

    return { getSettings, saveSettings };
}

export default useChromeStorage;