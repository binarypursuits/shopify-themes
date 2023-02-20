import { mdiOpenInApp } from '@mdi/js';
import Icon from '@mdi/react';
import { Tooltip, IconButton } from '@mui/material';

const openInCurrentTab = (url: string) => {
    chrome.tabs.update({ active: true, url });  
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
            onClick={() =>
                openInCurrentTab(
                `${baseUrl}?preview_theme_id=${previewThemeId}`
                )
            }
            >
            <Icon path={mdiOpenInApp} size={0.75} />
            </IconButton>
        </Tooltip>
    );
}

export default CurrentTabIcon;