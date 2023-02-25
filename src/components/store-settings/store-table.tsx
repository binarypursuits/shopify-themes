import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, ButtonGroup, Grid, Box, Modal, Typography } from '@mui/material';
import { useStoreContext, StoreContextState } from '../../hooks/use-stores-context';
import dayjs from 'dayjs';
import { Fragment, useState } from 'react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface StoreTableProps {
    onEdit: (name: string) => void;
    onDelete: (name: string) => void;
}

function StoreTable ({ onEdit, onDelete }:StoreTableProps) {
    const { shopifyStores } = useStoreContext() as StoreContextState;
    const [open, setOpen] = useState<boolean>(false);
    const [deleteStore, setDeleteStore] = useState<string>('');

    const confirmDeleteRequestModal = (name: string) => {
      setDeleteStore(name);
      setOpen(true);
    }

    const cancelDeleteStore = () => {
      setDeleteStore('');
      setOpen(false);
    }

    const confirmDeleteStore = () => {
      onDelete(deleteStore);
      setDeleteStore('');
      setOpen(false);
    }

    return (
      <Fragment>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Shopify Store</TableCell>
                <TableCell align="right">Last Theme Sync</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shopifyStores.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{dayjs(row.updatedAt).format('M/D/YY HH:mm')}</TableCell>
                  <TableCell align="right">
                      <ButtonGroup size="small">
                          <Button variant="contained" onClick={() => onEdit(row.name)}>Edit</Button>
                          <Button variant="contained" color="error" onClick={() => confirmDeleteRequestModal(row.name)}>Delete</Button> 
                      </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Caution
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete this store?
            </Typography>
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Button variant="contained" onClick={cancelDeleteStore}>No</Button>
              </Grid>
              <Grid item sx={{ ml: 2 }}>
                <Button variant="contained" color="error" onClick={confirmDeleteStore}>Yes</Button> 
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Fragment>
    )
}

export default StoreTable;