import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useGetManageActivityQuery, usePostActivityStatusMutation } from 'store/activity/activityService';
import { ActivityDataType, ManageActivityDataType } from 'types/data';
import TagIcon from '@mui/icons-material/Tag';

import { orderByUnion, sortByUnion } from 'types/request';
import {
  Chip,
  IconButton, MenuItem, Select, Stack, Typography,
} from '@mui/material';
import { activityTypeToColor } from 'utils/activityTypeToColor';
import ManageToolbar from './ManageToolbar';
import ManageHead from './ManageHead';
import {
  getComparator, stableSort, Order,
} from './utils';

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof ManageActivityDataType>('title');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { data: activityData } = useGetManageActivityQuery({
    orderBy: orderByUnion.DESC,
    sortBy: sortByUnion.CREATEDAT,
  });
  const [updateStatus] = usePostActivityStatusMutation();

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof ManageActivityDataType,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = activityData?.searchData?.map((n) => n.title);
      setSelected(newSelected || []);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (title: string) => selected.indexOf(title) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0
    ? Math.max(0, (1 + page) * rowsPerPage - (activityData?.searchData || []).length)
    : 0;

  const visibleRows = React.useMemo(
    () => stableSort(
      activityData?.searchData as readonly ActivityDataType[] || [],
      getComparator(order, orderBy),
    ).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
    [order, orderBy, page, rowsPerPage, activityData],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <ManageToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <ManageHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={activityData?.searchData?.length || 0}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.title);
                const labelId = `table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.title}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >

                    {/* checkbox */}
                    <TableCell padding="checkbox" onClick={(event) => handleClick(event, row.title)}>
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>

                    {/* image and title */}
                    <TableCell
                      component="th"
                      id={labelId}
                      onClick={(event) => handleClick(event, row.title)}
                      scope="row"
                      padding="none"
                    >
                      <Stack spacing={5} direction="row" alignItems="center" sx={{ p: 5 }}>
                        {!dense
                        && (
                          <Box
                            component="img"
                            sx={{
                              width: '150px',
                              height: '150px',
                              objectFit: 'cover',
                              mr: 5,
                            }}
                            src={row.images ? row.images[0] : undefined}
                          />
                        )}
                        <Typography variant="h5">
                          {row.title}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="right">{row.trend}</TableCell>
                    {/* <TableCell align="right">{row.createdTime}</TableCell> */}

                    {/* 標籤 */}
                    <TableCell align="left">
                      <Stack spacing={2} direction="row">
                        {row?.tags?.map((tag) => (
                          <Chip
                            color={activityTypeToColor(tag.type)}
                            icon={<TagIcon />}
                            size="small"
                            label={tag.text}
                            variant="outlined"
                          />
                        ))}
                      </Stack>
                    </TableCell>

                    {/* 控制 */}
                    <TableCell align="right">
                      <Stack spacing={2} direction="row" justifyContent="flex-end">
                        <Select
                          inputProps={{ MenuProps: { disableScrollLock: true } }}
                          autoWidth={false}
                          defaultValue={row.status}
                          onChange={(event) => updateStatus({
                            id: row.id,
                            status: event.target.value,
                          })}
                        >
                          <MenuItem value="願望" key="願望">
                            願望
                          </MenuItem>
                          <MenuItem value="已註冊" key="已註冊">
                            已註冊
                          </MenuItem>
                          <MenuItem value="已完成" key="已完成">
                            已完成
                          </MenuItem>
                        </Select>

                        <IconButton
                          size="large"
                          onClick={() => updateStatus({
                            id: row.id,
                            status: null,
                          })}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={activityData?.searchData?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="每頁筆數"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="密集排列"
      />
    </Box>
  );
}
