import { Store } from './use-stores-context';

const key = 'BPST';

export interface ShopifyThemesSettings {
  stores: Store[];
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
                      activeStore: ''
                    };
                }

                resolve(value[key] as ShopifyThemesSettings);
            });
        });
    }

    const saveSettings = (settings: ShopifyThemesSettings) => {
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