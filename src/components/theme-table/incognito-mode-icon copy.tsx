import { mdiIncognito } from '@mdi/js';
import Icon from '@mdi/react';
import { Tooltip, IconButton } from '@mui/material';

const openIncognitoWindow = (url: string) => {
    chrome.windows?.create({ url: url, incognito: true });
};

interface IncognitoModeIconProps {
    baseUrl: string;
    previewThemeId: string;
}

function IncognitoModeIcon({ baseUrl, previewThemeId }: IncognitoModeIconProps) {
    return (
        <Tooltip
            title="Open Theme in Incognito Mode"
            placement="top"
        >
            <IconButton
            aria-label="open in incognito"
            size="small"
            onClick={() =>
                openIncognitoWindow(
                `${baseUrl}?preview_theme_id=${previewThemeId}`
                )
            }
            >
            <Icon path={mdiIncognito} size={0.75} />
            </IconButton>
        </Tooltip>
    );
}

export default IncognitoModeIcon;