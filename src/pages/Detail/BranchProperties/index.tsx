import React from 'react';
import { BranchDataType } from 'types/data';
import {
  List, ListItem, ListItemIcon, ListItemText, ListSubheader,
} from '@mui/material';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';

interface DetailPropertyType {
  branch: BranchDataType
}

function BranchProperties({ branch }: DetailPropertyType) {
  const {
    dateStart,
    dateEnd,
    applyStart,
    applyEnd,
    applyFee,
    location,
  } = branch;

  return (
    <List>
      {/* 活動日期 */}
      <ListItem>
        <ListItemIcon><AlarmOnIcon /></ListItemIcon>
        <ListItemText>活動日期</ListItemText>
        <ListSubheader>
          {(dateStart && dateEnd)
            ? `${Object.keys(dateStart)[0]
            + Object.values(dateStart)[0]
            } ~ ${
              dateEnd[0]}`
            : '請查看原始連結'}
        </ListSubheader>
      </ListItem>

      {/* 報名日期 */}
      <ListItem>
        <ListItemIcon><CalendarMonthIcon /></ListItemIcon>
        <ListItemText>報名日期</ListItemText>
        <ListSubheader className="detail-properties__content">
          {(applyStart && applyEnd) ? `${applyStart[0]} ~ ${applyEnd[0]}` : '請查看原始連結'}
        </ListSubheader>
      </ListItem>

      <ListItem>
        <ListItemIcon><LocalAtmIcon /></ListItemIcon>
        <ListItemText>報名費</ListItemText>
        <ListSubheader className="detail-properties__content">
          {(applyFee) || '請查看原始連結'}
        </ListSubheader>
      </ListItem>

      {/* 地點 */}
      <ListItem>
        <ListItemIcon><ShareLocationIcon /></ListItemIcon>
        <ListItemText>活動地點</ListItemText>
        <ListSubheader className="detail-properties__content">
          {(location) ? location[0] : '請查看原始連結'}
        </ListSubheader>
      </ListItem>
    </List>
  );
}

export default BranchProperties;
