import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
          light: '#637973',
          main: '#384d48',
          dark: '#112521',
          contrastText: '#e2e2e2',
        },
        secondary: {
          light: '#826e73',
          main: '#554348',
          dark: '#2c1c21',
          contrastText: '#e2e2e2',
        },
        background: {
          default: '#ffffff'
        }
      },
});

export default theme;