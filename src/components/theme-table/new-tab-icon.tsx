import { mdiOpenInNew } from '@mdi/js';
import Icon from '@mdi/react';
import { Tooltip, IconButton } from '@mui/material';

interface NewTabIconProps {
    baseUrl: string;
    previewThemeId: string;
}

function NewTabIcon({ baseUrl, previewThemeId }: NewTabIconProps) {
    return (
        <Tooltip title="Open Theme in New Tab" placement="top">
            <IconButton
            aria-label="open in new tab"
            size="small"
            href={`${baseUrl}?preview_theme_id=${previewThemeId}`}
            target="_blank"
            >
            <Icon path={mdiOpenInNew} size={0.75} />
            </IconButton>
        </Tooltip>
    );
}

export default NewTabIcon;