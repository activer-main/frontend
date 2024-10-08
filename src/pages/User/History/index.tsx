import DeleteIcon from '@mui/icons-material/Delete';
import NearMeIcon from '@mui/icons-material/NearMe';
import TagIcon from '@mui/icons-material/Tag';
import {
  Chip,
  IconButton, Stack, Typography,
} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { format, parseISO } from 'date-fns';
import { times } from 'lodash';
import qs from 'qs';
import * as React from 'react';
import {
  useNavigate, useSearchParams,
} from 'react-router-dom';
import { orderByUnion } from 'types/request';
import { activityTypeToColor } from 'utils/activityTypeToColor';
import { grey } from '@mui/material/colors';
import { useConfirm } from 'material-ui-confirm';
import { toast } from 'react-toastify';
import { useGetSearchHistoryQuery } from 'store/user/endpoints/getSearchHistory';
import { useDeleteSearchHistoryMutation } from 'store/user/endpoints/deleteSearchHistory';
import HistoryToolbar from './components/HistoryToolbar';
import HistoryRowSkeleton from './components/HistoryRowSkeleton';
import HistoryHead from './components/HistoryHead';

function History() {
  const [selected, setSelected] = React.useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const countPerPage = parseInt(searchParams.get('countPerPage') || '5', 10);
  const navigate = useNavigate();
  const { data: historyData, isLoading: isGettingSearchHistory } = useGetSearchHistoryQuery({
    orderBy: orderByUnion.DESC,
    page,
    countPerPage,
  });
  const [deleteHistory] = useDeleteSearchHistoryMutation();
  const confirm = useConfirm();

  // select all
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = historyData?.searchData?.map((n) => n.id);
      setSelected(newSelected || []);
      return;
    }
    setSelected([]);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // change selected when row is clicked
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

  const handleDeleteSearchHistory = (ids: string[]) => {
    confirm({ title: '確定刪除此紀錄?' })
      .then(() => deleteHistory({ ids })
        .unwrap()
        .then(() => setSelected([]))
        .then(() => toast.success('成功刪除留言!')));
  };

  return (
    <Paper sx={{ width: '100%', p: 2 }}>
      {/* Toolbar */}
      <HistoryToolbar
        numSelected={selected.length}
        onDelete={() => handleDeleteSearchHistory(selected)}
      />

      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
        >

          {/* Header */}
          <HistoryHead
            numSelected={selected.length}
            onSelectAllClick={handleSelectAllClick}
            rowCount={historyData?.searchData?.length || 0}
          />

          <TableBody>
            {isGettingSearchHistory
              && times(parseInt(searchParams.get('countPerPage') || '5', 10), (index) => <HistoryRowSkeleton key={index} />)}

            {(!historyData?.searchData || !(historyData?.searchData.length > 0)) && (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: 'center' }}>暫無搜尋資料</TableCell>
              </TableRow>
            )}

            {historyData?.searchData && historyData.searchData.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
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

                  {/*  Keyword */}
                  <TableCell
                    component="th"
                    id={labelId}
                    onClick={(event) => handleClick(event, row.id)}
                    scope="row"
                    padding="none"
                    sx={{ minWidth: '40vw' }}
                  >
                    <Stack spacing={2} direction="row" alignItems="center" sx={{ p: 5 }}>

                      <Typography
                        variant="body1"
                        sx={{
                          display: '-webkit-box',
                          overflow: 'hidden',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          color: row.keyword ? 'inherit' : grey[300],
                        }}
                      >
                        {row.keyword ? row.keyword : '無'}
                      </Typography>
                    </Stack>
                  </TableCell>

                  {/* 標籤 */}
                  <TableCell align="left" sx={{ width: '20px' }} onClick={(event) => handleClick(event, row.id)}>
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

                  {/* Date */}
                  <TableCell
                    onClick={(event) => handleClick(event, row.id)}
                  >
                    {row.date && format(parseISO(row.date), 'yyyy/M/d')}
                  </TableCell>

                  {/* Control */}
                  <TableCell>

                    <Stack spacing={2} direction="row" justifyContent="flex-end">

                      {/* Delete Button */}
                      <IconButton
                        sx={{ width: 50, height: 50 }}
                        onClick={() => handleDeleteSearchHistory([row.id])}
                      >
                        <DeleteIcon />
                      </IconButton>

                      <IconButton
                        size="large"
                        sx={{ width: 50, height: 50 }}
                        onClick={() => navigate(`/search?${qs.stringify({
                          keyword: row.keyword,
                          tags: row.tags?.map((t) => t.text),
                          date: row.date && format(parseISO(row.date), 'yyyy-MM-dd'),
                        }, { arrayFormat: 'repeat' })}`)}
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
        count={historyData?.totalData || 0}
        rowsPerPage={historyData?.countPerPage || 5}
        page={(historyData?.page || 1) - 1 || 0}
        labelRowsPerPage="每頁筆數"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default History;
