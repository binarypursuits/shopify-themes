import { mdiContentCopy } from '@mdi/js';
import Icon from '@mdi/react';
import { Tooltip, IconButton } from '@mui/material';

const copyToClipboard = async (url: string) => {
    await navigator.clipboard.writeText(url);
    return true;
};

interface CopyThemeLinkIconProps {
    baseUrl: string;
    previewThemeId: string;
}

function CopyThemeLinkIcon({ baseUrl, previewThemeId }: CopyThemeLinkIconProps) {
    return (
        <Tooltip
            title="Copy Preview Theme Link"
            placement="top"
        >
            <IconButton
            aria-label="copy preview link"
            size="small"
            onClick={() =>
                copyToClipboard(
                `${baseUrl}?preview_theme_id=${previewThemeId}`
                )
            }
            >
            <Icon path={mdiContentCopy} size={0.75} />
            </IconButton>
        </Tooltip>
    );
}

export default CopyThemeLinkIcon;