import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, InputBase, Paper, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import { Fragment, useEffect, useState } from 'react';
import {
  Store,
  StoreContextState,
  useStoreContext,
} from '../hooks/use-stores-context';
import ThemeTable from './theme-table';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  borderColor: '#666',
  backgroundColor: alpha(theme.palette.common.white, 0.65),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 1.0),
  },
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
  width: '325px',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

interface StoreThemeProps {
  name: string;
}

function StoreThemes({ name }: StoreThemeProps) {
  const { getStore, updateStore } = useStoreContext() as StoreContextState;
  const [store, setStore] = useState<Store | null>(null);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (name) {
      const s = getStore(name);
      setStore(s);
    }
  }, [name, getStore, setStore]);

  const onThemeRefreshClicked = () => {
    if (!store) {
      return;
    }
    updateStore(store);
  };

  return (
    store && (
      <Fragment>
        <Typography variant="h5" component="div" align="left" sx={{ color: '#363636', pb: 2, pl: 2 }}>
          { store.title }
        </Typography>
        <Paper elevation={3} sx={{ px: 2, pb: 2, pt: 1, backgroundColor: '#e2e2e2' }}>
          <Grid container justifyContent="space-between" sx={{ pb: 1 }}>
            <Grid item flexGrow={0}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </Search>
            </Grid>
            <Grid
              container
              item
              alignContent="center"
              justifyContent="center"
              sx={{ width: "auto" }}
            >
              <Grid item>
                <Typography
                  variant="caption"
                  display="block"
                  sx={{ lineHeight: "30px" }}
                >
                  {`Last Updated: ${dayjs(store.updatedAt).format(
                    "M/D/YY HH:mm"
                  )}`}
                </Typography>
              </Grid>
              <Grid item sx={{ pl: 2 }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => onThemeRefreshClicked()}
                >
                  Refresh
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <ThemeTable
            baseUrl={store.baseUrl}
            themes={store.themes}
            searchTerm={search}
          />
        </Paper>
      </Fragment>
    )
  );
}

export default StoreThemes;
