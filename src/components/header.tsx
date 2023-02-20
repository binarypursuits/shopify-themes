import { AppBar, Toolbar, Typography, IconButton, Divider, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useStoreContext, Store, StoreContextState } from '../hooks/use-stores-context';

interface HeaderProps {
    onSettingsClicked: () => void;
}

function Header({  onSettingsClicked }: HeaderProps) {
  const { shopifyStores, setActiveStore } = useStoreContext() as StoreContextState;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStoreClick = (name: string) => {
    setActiveStore(name);
    handleClose();
  }

  const handleSettingsClick = () => {
    onSettingsClicked()
    handleClose();
  }

  return (
    <header>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleClick}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h5" component="div" align="right" sx={{ flexGrow: 1 }}>
            BinaryPursuits - Shopify Themes
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {shopifyStores && shopifyStores.map((store: Store) =>
          <MenuItem onClick={() => handleStoreClick(store.name)}>{store.title}</MenuItem>
        )}
        <Divider />
        <MenuItem onClick={() => handleSettingsClick()}>Settings</MenuItem>
      </Menu>
    </header>
  );
}

export default Header;