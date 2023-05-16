import React from 'react';
import TableHead from '@mui/material/TableHead';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import {
  Box, Checkbox, IconButton, ListItemText, Menu, MenuItem, Stack, TableCell, TableRow, Typography,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { orderByUnion, sortByUnion } from 'types/request';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useGetFilterValueQuery } from 'store/activity/activityService';
import _ from 'lodash';

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
  {
    id: sortByUnion.CREATEDAT,
    numeric: true,
    disablePadding: false,
    label: '活動建立時間',
  },
  {
    id: sortByUnion.ADDTIME,
    numeric: true,
    disablePadding: false,
    label: '加入願望清單時間',
  },
];

export default function ManageHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick, orderBy, sortBy, numSelected, rowCount,
  } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: filterData } = useGetFilterValueQuery();
  const [selectTags, setSelectTags] = React.useState<string[]>(searchParams.getAll('tags'));
  const [selectStatus, setSelectStatus] = React.useState<string[]>(searchParams.getAll('status'));

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

  const [tagFilterAnchorEl, setTagFilterAnchorEl] = React.useState<null | HTMLElement>(null);
  const [statusFilterAnchorEl, setStatusFilterAnchorEl] = React.useState<null | HTMLElement>(null);
  const openStatusFilterMenu = Boolean(statusFilterAnchorEl);
  const openTagFilterMenu = Boolean(tagFilterAnchorEl);

  const handleTagFilterClose = () => {
    setTagFilterAnchorEl(null);
    setSearchParams((prevSearchParam) => {
      prevSearchParam.delete('tags');
      selectTags.map((tag) => prevSearchParam.append('tags', tag));
      return prevSearchParam;
    });
  };
  const handleStatusFilterClose = () => {
    setStatusFilterAnchorEl(null);
    setSearchParams((prevSearchParam) => {
      prevSearchParam.delete('status');
      selectStatus.map((st) => prevSearchParam.append('status', st));
      return prevSearchParam;
    });
  };

  const handleTagMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    text: string,
  ) => {
    if (_.includes(selectTags, text)) {
      setSelectTags(selectTags.filter((tag) => tag !== text));
    } else {
      setSelectTags([...selectTags, text]);
    }
  };
  const handleStatusMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    text: string,
  ) => {
    if (_.includes(selectStatus, text)) {
      setSelectStatus(selectStatus.filter((tag) => tag !== text));
    } else {
      setSelectStatus([...selectStatus, text]);
    }
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
          <Typography variant="body1">
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
              <Typography variant="body1">
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
        <TableCell>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="body1">
              標籤
            </Typography>
            <IconButton size="small" onClick={(event) => setTagFilterAnchorEl(event.currentTarget)}>
              <FilterAltIcon />
            </IconButton>
          </Stack>

          <Menu
            open={openTagFilterMenu}
            anchorEl={tagFilterAnchorEl}
            onClose={handleTagFilterClose}
          >
            {filterData?.tags.map((tag) => (
              <MenuItem
                key={tag.id}
                onClick={(event) => handleTagMenuItemClick(event, tag.text!)}
              >
                <Checkbox checked={selectTags.includes(tag.text!)} />
                <ListItemText primary={tag.text} />
              </MenuItem>
            ))}
          </Menu>
        </TableCell>

        <TableCell>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography variant="body1">
              狀態
            </Typography>
            <IconButton size="small" onClick={(event) => setStatusFilterAnchorEl(event.currentTarget)}>
              <FilterAltIcon />
            </IconButton>
          </Stack>
          <Menu
            open={openStatusFilterMenu}
            anchorEl={statusFilterAnchorEl}
            onClose={handleStatusFilterClose}
          >
            {filterData?.status.map((st, index) => (
              <MenuItem
                key={index}
                onClick={(event) => handleStatusMenuItemClick(event, st)}
              >
                <Checkbox checked={selectStatus.includes(st!)} />
                <ListItemText primary={st} />
              </MenuItem>
            ))}
          </Menu>
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
