import { Store } from './use-stores-context';

const key = 'CSSTE';

function useChromeStorage() {

    const getSettings = (): Promise<Store[]> => {
        return new Promise(function(resolve, reject) {
            chrome.storage.local.get([key], (value) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                }

                if (!value[key]) {
                    return [];
                }

                resolve(value[key] as Store[]);
            });
        });
    }

    const saveSettings = (settings: Store[]) => {
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