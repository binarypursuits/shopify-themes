import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button, ButtonGroup } from '@mui/material';
import { useStoreContext, StoreContextState } from '../../hooks/use-stores-context';

interface StoreTableProps {
    onEdit: (name: string) => void;
    onDelete: (name: string) => void;
}

function StoreTable ({ onEdit, onDelete }:StoreTableProps) {
    const { shopifyStores } = useStoreContext() as StoreContextState;
    return (
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
                <TableCell align="right">{row.updatedAt}</TableCell>
                <TableCell align="right">
                    <ButtonGroup size="small">
                        <Button variant="contained" onClick={() => onEdit(row.name)}>Edit</Button>
                        <Button variant="contained" color="error" onClick={() => onDelete(row.name)}>Delete</Button> 
                    </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default StoreTable;