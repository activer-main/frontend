import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import {
  Box, Checkbox, TableCell, TableRow, Typography,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { orderByUnion, sortByUnion } from 'types/request';

interface HeadCell {
  disablePadding: boolean;
  id: sortByUnion;
  label: string;
  numeric: boolean;
}

interface EnhancedTableProps {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  orderBy: orderByUnion;
  sortBy: sortByUnion;
  rowCount: number;
}

const headCells: readonly HeadCell[] = [
  {
    id: sortByUnion.TREND,
    numeric: true,
    disablePadding: false,
    label: '熱度',
  },
  // {
  //   id: sortByUnion.CREATEDAT,
  //   numeric: true,
  //   disablePadding: false,
  //   label: '活動加入時間',
  // },
];

export default function ManageHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick, orderBy, sortBy, numSelected, rowCount,
  } = props;
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  const handleRequestSort = (
    property: sortByUnion,
  ) => {
    const isAsc = sortBy === property && orderBy === orderByUnion.ASC;
    setSearchParams((prevSearchParam) => {
      prevSearchParam.set('orderBy', isAsc ? orderByUnion.DESC : orderByUnion.ASC);
      prevSearchParam.set('sortBy', property);
      return prevSearchParam;
    });
  };

  return (
    <TableHead>
      <TableRow>

        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>

        {/* Title */}
        <TableCell align="left">
          <Typography variant="h5">
            標題
          </Typography>
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            sx={{ whiteSpace: 'noWrap' }}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            <TableSortLabel
              active={sortBy === headCell.id}
              direction={orderBy === orderByUnion.DESC ? 'desc' : 'asc'}
              onClick={() => handleRequestSort(headCell.id)}
            >
              <Typography variant="h5">
                {headCell.label}
              </Typography>
              {sortBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {orderBy === orderByUnion.DESC ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center">
          <Typography variant="h5">
            標籤
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Typography variant="h5">
            控制
          </Typography>
        </TableCell>

      </TableRow>
    </TableHead>
  );
}
