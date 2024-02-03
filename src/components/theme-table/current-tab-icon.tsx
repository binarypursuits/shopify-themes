import { mdiOpenInApp } from '@mdi/js';
import Icon from '@mdi/react';
import { Tooltip, IconButton } from '@mui/material';

const openInCurrentTab = (url: string, previewThemeId: string) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (result: chrome.tabs.Tab[]) => {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
    }

    const newUrl = new URL(url);
    if (result[0]?.url) {
      const currentUrl = new URL(result[0].url);
      if (currentUrl.host === newUrl.host) {
        newUrl.pathname = currentUrl.pathname;
      }
    }

    newUrl.searchParams.set('preview_theme_id', previewThemeId);
    chrome.tabs.update({ active: true, url: newUrl.href });
  });
      
};

interface CurrentTabIconProps {
    baseUrl: string;
    previewThemeId: string;
}

function CurrentTabIcon({ baseUrl, previewThemeId }: CurrentTabIconProps) {
    return (
        <Tooltip
            title="Open Theme in Current Tab"
            placement="top"
        >
            <IconButton
            aria-label="open in this tab"
            size="small"
            onClick={() => openInCurrentTab(baseUrl, previewThemeId)}
            >
            <Icon path={mdiOpenInApp} size={0.75} />
            </IconButton>
        </Tooltip>
    );
}

export default CurrentTabIcon;