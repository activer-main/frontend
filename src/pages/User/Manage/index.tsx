import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import TagIcon from '@mui/icons-material/Tag';
import NearMeIcon from '@mui/icons-material/NearMe';
import { orderByUnion, sortByUnion } from 'types/request';
import {
  Chip,
  IconButton, MenuItem, Select, Stack, Typography,
} from '@mui/material';
import { activityTypeToColor } from 'utils/activityTypeToColor';
import { toast } from 'react-toastify';
import {
  LoaderFunction, redirect, useNavigate, useSearchParams,
} from 'react-router-dom';
import { times } from 'lodash';
import { statusUnion } from 'types/data';
import { format, parseISO } from 'date-fns';
import { useGetManageActivityQuery } from 'store/activity/endpoints/getActivities';
import { useDeleteManageActivityMutation } from 'store/activity/endpoints/deleteManageActivities';
import { usePostActivityStatusMutation } from 'store/activity/endpoints/postActivityStatus';
import ManageToolbar from './ManageToolbar';
import ManageHead from './ManageHead';
import ManageRowSkeleton from './ManageRowSkeleton';

export const manageLoader:LoaderFunction = ({ request }) => {
  const { searchParams } = new URL(request.url);
  const orderBy = searchParams.get('orderBy');
  const sortBy = searchParams.get('sortBy');
  const isValidOrderBy = Object.values(orderByUnion).includes(orderBy as orderByUnion);
  const isValidSortBy = Object.values(sortByUnion).includes(sortBy as sortByUnion);
  if (!searchParams.get('page')) searchParams.set('page', '1');

  if (!isValidOrderBy) {
    if (orderBy) {
      toast.warn('排序參數錯誤，已重新導向至降序');
    }
    searchParams.set('orderBy', orderByUnion.DESC);
    return redirect(`/user/manage?${searchParams.toString()}`);
  }

  if (!isValidSortBy) {
    if (sortBy) {
      toast.warn('分類參數錯誤，已重新導向至熱門活動');
    }
    searchParams.set('sortBy', sortByUnion.TREND);
    return redirect(`/user/manage?${searchParams.toString()}`);
  }

  return null;
};

function Manage() {
  // hook init
  const navigate = useNavigate();
  const [updateStatus] = usePostActivityStatusMutation();
  const [deleteManageActivities] = useDeleteManageActivityMutation();
  const [searchParams, setSearchParams] = useSearchParams();

  // table cell selected state
  const [selected, setSelected] = React.useState<string[]>([]);

  // fetch data by params
  const orderBy = searchParams.get('orderBy') as orderByUnion || orderByUnion.DESC;
  const sortBy = searchParams.get('sortBy') as sortByUnion || sortByUnion.CREATEDAT;
  const tags = searchParams.getAll('tags');
  const status = searchParams.getAll('status');
  const page = parseInt(searchParams.get('page') || '1', 10);
  const countPerPage = parseInt(searchParams.get('countPerPage') || '5', 10);
  const { data: activityData, isLoading: isGettingActivity } = useGetManageActivityQuery({
    orderBy, sortBy, page, countPerPage, tags, status: status.length > 0 ? status : undefined,
  });

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = activityData?.searchData?.map((n) => n.id);
      setSelected(newSelected || []);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
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
    setSearchParams((prevSearchParam) => {
      prevSearchParam.set('page', (newPage + 1).toString());
      return prevSearchParam;
    });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prevSearchParam) => {
      prevSearchParam.set('countPerPage', event.target.value);
      prevSearchParam.set('page', '1');
      return prevSearchParam;
    });
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  return (
    <Paper>
      {/* Toolbar */}
      <ManageToolbar
        numSelected={selected.length}
        onDelete={() => deleteManageActivities(selected).unwrap().then(() => toast.success('刪除成功'))}
      />

      <TableContainer>
        <Table>

          {/* Header */}
          <ManageHead
            numSelected={selected.length}
            orderBy={activityData?.orderBy || orderByUnion.DESC}
            sortBy={activityData?.sortBy || sortByUnion.CREATEDAT}
            onSelectAllClick={handleSelectAllClick}
            rowCount={activityData?.searchData?.length || 0}
          />

          <TableBody>
            {isGettingActivity
              && times(5, (index) => <ManageRowSkeleton key={index} />)}

            {activityData?.searchData?.map((row, index) => {
              const isItemSelected = isSelected(row.id);
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
                  <TableCell padding="checkbox" onClick={(event) => handleClick(event, row.id)}>
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>

                  {/*  title */}
                  <TableCell
                    component="th"
                    id={labelId}
                    onClick={(event) => handleClick(event, row.id)}
                    scope="row"
                    padding="none"
                    sx={{ minWidth: '20em' }}
                  >
                    <Stack spacing={2} direction="row" alignItems="center" sx={{ p: 5 }}>

                      <Typography
                        variant="body1"
                        sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                        }}
                      >
                        {row.title}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* Trend */}
                  <TableCell align="right" onClick={(event) => handleClick(event, row.id)}>{row.trend}</TableCell>

                  {/* Created Time */}
                  <TableCell align="right" onClick={(event) => handleClick(event, row.id)}>{row.createAt && format(parseISO(row.createAt), 'yyyy/M/d')}</TableCell>

                  {/* Add time */}
                  <TableCell align="right" onClick={(event) => handleClick(event, row.id)}>{row.addTime && format(parseISO(row.addTime), 'yyyy/M/d')}</TableCell>

                  {/* 標籤 */}
                  <TableCell align="left" sx={{ width: '20px' }}>
                    <Stack spacing={2} direction="row">
                      {row?.tags?.map((tag) => (
                        <Chip
                          key={tag.id}
                          color={activityTypeToColor(tag.type)}
                          icon={<TagIcon />}
                          size="small"
                          label={tag.text}
                          variant="outlined"
                        />
                      ))}
                    </Stack>
                  </TableCell>

                  <TableCell align="center">
                    <Select
                      inputProps={{ MenuProps: { disableScrollLock: true } }}
                      autoWidth={false}
                      defaultValue={row.status}
                      onChange={(event) => updateStatus({
                        id: row.id,
                        status: event.target.value as statusUnion,
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
                  </TableCell>

                  {/* 控制 */}
                  <TableCell align="right">

                    <Stack spacing={2} direction="row" justifyContent="flex-end">
                      {/* Status Select */}

                      {/* Delete Button */}
                      <IconButton
                        sx={{ width: 50, height: 50 }}
                        onClick={() => deleteManageActivities([row.id]).unwrap().then(() => toast.success('刪除成功'))}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <IconButton
                        size="large"
                        sx={{ width: 50, height: 50 }}
                        onClick={() => navigate(`/detail/${row.id}`)}
                      >
                        <NearMeIcon />
                      </IconButton>

                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={activityData?.totalData || 0}
        rowsPerPage={activityData?.countPerPage || 5}
        page={(activityData?.page || 1) - 1 || 0}
        labelRowsPerPage="每頁筆數"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default Manage;
