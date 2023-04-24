import React from 'react';
import { BranchDataType } from 'types/data';
import {
  List, ListItem, ListItemIcon, ListItemText, ListSubheader,
} from '@mui/material';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';

interface DetailPropertyType {
  branch: BranchDataType
}

function BranchProperties({ branch }: DetailPropertyType) {
  const {
    date,
    location,
  } = branch;

  return (
    <List>

      {/* Date */}
      {date.map((d) => (
        <ListItem>
          <ListItemIcon><AlarmOnIcon /></ListItemIcon>
          <ListItemText>{d.name}</ListItemText>
          <ListSubheader>
            {d.start?.toString()}
            ~
            {d.end?.toString()}
          </ListSubheader>

        </ListItem>
      ))}

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
