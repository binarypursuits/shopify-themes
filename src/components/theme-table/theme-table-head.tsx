import { TableHead, TableRow, TableCell, TableSortLabel, Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { useState } from 'react';
import Theme, { Order } from './theme-model';

interface ThemeTableHeadProps {
    onOrderChange: (direction: Order) => void;
    onOrderByChange: (property: keyof Theme) => void;
}

function ThemeTableHead({ onOrderChange, onOrderByChange }: ThemeTableHeadProps) {
    const [order, setOrder] = useState<Order>('desc');
    const [orderBy, setOrderBy] = useState<keyof Theme>('updatedAt');
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Theme
      ) => {
        const isAsc = orderBy === property && order === 'asc';
        const direction = isAsc ? 'desc' : 'asc';
        setOrder(direction);
        onOrderChange(direction);
        setOrderBy(property);
        onOrderByChange(property);
      };
    const createSortHandler =
    (property: keyof Theme) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };
    return (
        <TableHead>
            <TableRow>
              <TableCell
                key="name"
                align="left"
                sortDirection={orderBy === 'name' ? order : false}
              >
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? order : "asc"}
                  onClick={createSortHandler('name')}
                >
                  Name
                  {orderBy === 'name' ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="createdAt"
                align="left"
                sortDirection={orderBy === 'createdAt' ? order : false}
              >
                <TableSortLabel
                  active={orderBy === 'createdAt'}
                  direction={orderBy === 'createdAt' ? order : 'asc'}
                  onClick={createSortHandler('createdAt')}
                >
                  Created
                  {orderBy === 'createdAt' ? (
                    <Box component='span' sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell
                key="updatedAt"
                align="left"
                sortDirection={orderBy === 'updatedAt' ? order : false}
              >
                <TableSortLabel
                  active={orderBy === 'updatedAt'}
                  direction={orderBy === 'updatedAt' ? order : 'asc'}
                  onClick={createSortHandler('updatedAt')}
                >
                  Updated
                  {orderBy === 'updatedAt' ? (
                    <Box component='span' sx={visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
    );
}

export default ThemeTableHead;
