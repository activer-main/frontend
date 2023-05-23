import React from 'react';
import TableHead from '@mui/material/TableHead';
import {
  Checkbox,
  TableCell, TableRow, Typography,
} from '@mui/material';

interface HistoryHeadType {
  numSelected: number;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rowCount: number;
}

export default function ManageHead(props: HistoryHeadType) {
  const {
    onSelectAllClick, numSelected, rowCount,
  } = props;

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

        {/* Keyword */}
        <TableCell align="left">
          <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
            關鍵字
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
            標籤
          </Typography>
        </TableCell>

        <TableCell>
          <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
            日期
          </Typography>
        </TableCell>

        <TableCell align="center">
          <Typography variant="body1">
            控制
          </Typography>
        </TableCell>

      </TableRow>
    </TableHead>
  );
}
