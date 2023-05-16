import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { alpha } from '@mui/material/styles';
import { Menu, MenuItem, Select } from '@mui/material';

interface ManageToolbarType {
  numSelected: number;
  onDelete:React.MouseEventHandler;
}

export default function ManageToolbar(props: ManageToolbarType) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { numSelected, onDelete } = props;

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
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',

        }}
        // sx={{ maxWidth: 0, maxHeight: 300, position: 'absolute' }}
        disableScrollLock
      >
        <MenuItem>
          <Select>
            <MenuItem>標籤</MenuItem>
            <MenuItem> 標籤 </MenuItem>
          </Select>
          <Select>
            <MenuItem>願望</MenuItem>
            <MenuItem>已完成</MenuItem>
          </Select>
        </MenuItem>

      </Menu>
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
          活動管理
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (

        // Filter
        <Tooltip title="Filter list">
          <IconButton onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>

      )}

    </Toolbar>
  );
}
