import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Grid, Typography } from '@mui/material';
import { useStoreContext, StoreContextState } from '../../hooks/use-stores-context';

interface StoreForm {
    title: string;
    store: string;
    token: string;
    domain: string;
}

const nullFormState = {
    title: '',
    store: '',
    token: '',
    domain: ''
  };

interface AddEditStoreFormProps {
  name?: string;
  onSave: () => void;
  onCancel: () => void;
}

function AddEditStoreForm({ name, onSave, onCancel }: AddEditStoreFormProps) {
    const { addStore, getStore, updateStore } = useStoreContext() as StoreContextState;

  const [store, setStore] = useState<StoreForm>(nullFormState);
  const [isEdit, setIsEdit] = useState<boolean>(name ? true : false);
  const [isValid, setIsValid] = useState<boolean>(false);

  useEffect(() => {
    let newIsValid = false;
    if (store.title && store.store && store.token) {
        newIsValid = true;
    } 

    setIsValid(newIsValid)
  }, [store, setIsValid])

  useEffect(() => {
    if (name) {
      setIsEdit(true);
      const editStore = getStore(name);
      setStore({
        title: editStore.title || '',
        store: editStore.name || '',
        token: editStore.token || '',
        domain: editStore.domain || ''
      } as StoreForm)
    } 
  }, [name, getStore, setStore])

  const onSubmit = () => {
    const data = {
      name: store.store,
      title: store.title,
      token: store.token,
      domain: store.domain || '',
      baseUrl: store.domain ? store.domain : `https://${store.store}.myshopify.com`,
      themes: [],
      updatedAt: 0
    };

    try {
      if (isEdit) {
        updateStore(data);
      } else {
        addStore(data);
      }

      setStore(nullFormState);
      onSave();
    } catch(e) {
      // intentionally suppressing error
    }
  }

  return (
    <Box component="form" autoComplete="off" sx={{ p: 2 }}>
      <Grid container spacing={1} pb={1}>
        <Grid container item xs={6} direction="column" pr={8}>
          <Typography variant="subtitle2" gutterBottom component="label">
            Title
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Enter title displayed in navigation tabs of extension.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            value={store.title}
            onChange={(e) => setStore({ ...store, title: e.target.value })}
            sx={{ backgroundColor: 'white', borderRadius: '4px;' }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} pb={1}>
        <Grid container item xs={6} direction="column" pr={8}>
          <Typography variant="subtitle2" gutterBottom component="label">
            Shopify Store
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Enter your Shopify store name, not the domain provided to you by
            Shopify.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            value={store.store}
            onChange={(e) => setStore({ ...store, store: e.target.value })}
            sx={{ backgroundColor: 'white', borderRadius: '4px;' }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} pb={1}>
        <Grid container item xs={6} direction="column" pr={8}>
          <Typography variant="subtitle2" gutterBottom component="label">
            Access Token
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            Enter your access token to
            make requests to Shopify's servers.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="password"
            fullWidth
            required
            value={store.token}
            onChange={(e) => setStore({ ...store, token: e.target.value })}
            sx={{ backgroundColor: 'white', borderRadius: '4px;' }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1} pb={1}>
        <Grid container item xs={6} direction="column" pr={8}>
          <Typography variant="subtitle2" gutterBottom component="label">
            Custom Domain
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            If you use a custom domain to access your Shopify store, you can
            enter it hear. This field is not required.
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="url"
            fullWidth
            value={store.domain}
            onChange={(e) => setStore({ ...store, domain: e.target.value })}
            sx={{ backgroundColor: 'white', borderRadius: '4px;' }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} pb={1} justifyContent="flex-end">
        <Grid item>
          <Button variant="outlined" size="large" onClick={onCancel}>Cancel</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" size="large" disabled={!isValid} onClick={onSubmit}>Save Store</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddEditStoreForm;