import {
  Checkbox, Chip, IconButton, Skeleton, Stack, TableCell, TableRow, Typography,
} from '@mui/material';
import { times } from 'lodash';
import React from 'react';

function ManageRowSkeleton() {
  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
    >
      {/* checkbox */}
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          disabled
        />
      </TableCell>

      {/* Keyword */}
      <TableCell
        component="th"
        scope="row"
        padding="none"
      >
        <Typography variant="body1">
          <Skeleton />
        </Typography>
      </TableCell>

      {/* 標籤 */}
      <TableCell align="left">
        <Stack spacing={2} direction="row">
          {times(3, (index) => (
            <Skeleton key={index}>
              <Chip
                size="small"
                variant="outlined"
              />
            </Skeleton>
          ))}
        </Stack>
      </TableCell>

      {/* Date */}
      <TableCell>
        <Typography variant="body1">
          <Skeleton />
        </Typography>
      </TableCell>

      {/* 控制 */}
      <TableCell align="right">

        <Stack spacing={2} direction="row" justifyContent="flex-end">
          {/* Status Select */}
          <Skeleton width="30px" height="20px" />

          {/* Delete Button */}
          <Skeleton>
            <IconButton size="large" />
          </Skeleton>

          <Skeleton>
            <IconButton size="large" />
          </Skeleton>

        </Stack>
      </TableCell>
    </TableRow>
  );
}

export default ManageRowSkeleton;
