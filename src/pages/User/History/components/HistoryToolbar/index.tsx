import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha } from '@mui/material/styles';
import { useDeletSearchHistoryMutation } from 'store/user/userService';
import { Button } from '@mui/material';

interface HistoryToolbarType {
  numSelected: number;
  onDelete:React.MouseEventHandler;
}

export default function HistoryToolbar(props: HistoryToolbarType) {
  const { numSelected, onDelete } = props;
  const [deleteHistory] = useDeletSearchHistoryMutation();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity,
          ),
        }),
      }}
    >

      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected}
          {' '}
          已選擇
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          搜尋紀錄
          <Button onClick={() => deleteHistory({})} color="secondary" sx={{ ml: 2 }}>
            清除所有搜尋紀錄
          </Button>
        </Typography>
      )}
      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) }

    </Toolbar>
  );
}
