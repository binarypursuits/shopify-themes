import { Fragment, useEffect, useState } from 'react';
import { mdiCartPlus } from '@mdi/js';
import Icon from '@mdi/react';
import { Tooltip, IconButton, Grid, Paper, Typography } from '@mui/material';
import StoreTable from './store-table';
import { useStoreContext, StoreContextState } from '../../hooks/use-stores-context';
import AddEditStoreForm from './add-edit-store-form';

function StoreSettings () {
  const { form, setForm, shopifyStores, removeStore } = useStoreContext() as StoreContextState;
    const [showForm, setShowForm] = useState<boolean>(false);
    const [editStore, setEditStore] = useState<string | undefined>(undefined);

    useEffect(() => {
      if (shopifyStores.length === 0) {
        setShowForm(true);
      }

      if (form.domain || form.store || form.title || form.token) {
        setShowForm(true);
      }
    }, [])

    const onEditClicked = (name: string) => {
      setShowForm(true);
      setEditStore(name);
    }

    const onDeleteClicked = (name: string) => {
      removeStore(name);
    }

    const onNewClicked = () => {
      setEditStore(undefined);
      setShowForm(true);
    }

    const onFormCancelClick = () => {
      setEditStore(undefined);
      setShowForm(false);
      setForm({
        title: '',
        store: '',
        token: '',
        domain: ''
      });
    }

    const onFormSaveClick = () => {
      setEditStore(undefined);
      setShowForm(false);
      setForm({
        title: '',
        store: '',
        token: '',
        domain: ''
      });
    }

    return (
      <Fragment>
        <Typography variant="h5" component="div" align="left" sx={{ color: '#363636', pb: 2, pl: 2 }}>
          Settings
        </Typography>
        <Paper elevation={3} sx={{ px: 2, pb: 2, pt: 1, backgroundColor: '#e2e2e2' }}>
          {!showForm &&
            <Grid container justifyContent="flex-end" sx={{ pb: 2 }}>
              <Grid item>
                <Tooltip
                  title="Add a Shopify store"
                  placement="top"
              >
                  <IconButton
                    aria-label="Add a Shopify store"
                    size="large"
                    onClick={() => onNewClicked()}>
                    <Icon path={mdiCartPlus} size={0.75} />
                  </IconButton>
              </Tooltip>
              </Grid>
            </Grid>}
        {
          showForm ?
            <AddEditStoreForm name={editStore} onCancel={onFormCancelClick} onSave={onFormSaveClick} /> :
            <StoreTable onEdit={onEditClicked} onDelete={onDeleteClicked} />
        }
        </Paper>
      </Fragment>
    )
}

export default StoreSettings;