import Theme, { Order } from './theme-model';
import { Paper, Table, TableBody, TablePagination } from '@mui/material';
import ThemeTableHead from './theme-table-head';
import ThemeTableRow from './theme-table-row';
import { useState, useEffect, Fragment } from "react";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
}

  
function getComparator<T>(order: Order, orderBy: keyof T): (a: T, b: T) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface ThemeTableProps {
    baseUrl: string;
    themes: Theme[];
    searchTerm: string;
}

function ThemeTable({ baseUrl, themes, searchTerm }: ThemeTableProps) {
    const [rows, setRows] = useState<Theme[]>([]);
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof Theme>('updatedAt');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        if (themes.length === 0) {
          return;
        }
    
        let newRows = themes;
        if (searchTerm.length > 0) {
          newRows = themes.filter((theme: Theme) => {
            const name = theme.name.toLowerCase();
            if (name.indexOf(searchTerm.toLowerCase()) > -1) {
              return true;
            }
    
            return false;
          });
        }
    
        setRows(newRows);
        setPage(0);
      }, [searchTerm, themes, setPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
  
    return (
      <Fragment>
            <Table component={Paper} aria-label="themes table" sx={{ maxWidth: '780px' }}>
            <ThemeTableHead onOrderByChange={setOrderBy} onOrderChange={setOrder} />
            <TableBody>
                {stableSort<Theme>(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => <ThemeTableRow row={row} baseUrl={baseUrl} />)}
            </TableBody>
            </Table>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Fragment>
    );
}

export default ThemeTable;