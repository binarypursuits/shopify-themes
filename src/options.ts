interface IOptions {
    finished: boolean;
    store: string;
    accessTokenEV: string;
    domain: string;
}

const options: IOptions = {
    finished: false,
    store: '',
    accessTokenEV: '',
    domain: ''
};

chrome.storage.sync.get('options', (data) => {
    Object.assign(options, data.options);    
});

export function save(options: IOptions) {
    chrome.storage.sync.set({ options });
}

export default options;
