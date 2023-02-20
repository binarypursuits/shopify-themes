import { TableRow, TableCell, Typography } from '@mui/material';
import CopyThemeLinkIcon from './copy-theme-link-icon';
import CurrentTabIcon from './current-tab-icon';
import IncognitoModeIcon from './incognito-mode-icon copy';
import NewTabIcon from './new-tab-icon';
import Theme from './theme-model';
import dayjs from 'dayjs';

interface ThemeRowHeadProps {    
    row: Theme;
    baseUrl: string;
  }

function ThemeTableRow({ row, baseUrl }: ThemeRowHeadProps) {
    return (
        <TableRow
            tabIndex={-1}
            key={row.name}
            >
            <TableCell align="left" sx={{ paddingY: 1 }}>
                <div className={`name-${row.id}`}>{row.name}</div>
            </TableCell>
            <TableCell align="left" sx={{ paddingY: 1 }}>
                <Typography variant="caption" display="block">
                    {dayjs(row.createdAt).format('M/D/YY HH:mm')}
                </Typography>
            </TableCell>
            <TableCell align="left" sx={{ paddingY: 1 }}>
                <Typography variant="caption" display="block">
                    {dayjs(row.updatedAt).format('M/D/YY HH:mm')}
                </Typography>
            </TableCell>
            <TableCell align="left" sx={{ paddingY: 1 }}>
                <>                        
                <CopyThemeLinkIcon baseUrl={baseUrl} previewThemeId={row.id} />
                <CurrentTabIcon baseUrl={baseUrl} previewThemeId={row.id} />
                <NewTabIcon baseUrl={baseUrl} previewThemeId={row.id} />
                <IncognitoModeIcon baseUrl={baseUrl} previewThemeId={row.id} />
                </>
            </TableCell>
            </TableRow>
    );
}

export default ThemeTableRow;