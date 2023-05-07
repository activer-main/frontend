import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { BranchDataType } from 'types/data';
import {
  List, ListItem, ListItemIcon, ListItemText, ListSubheader,
} from '@mui/material';
import AlarmOnIcon from '@mui/icons-material/AlarmOn';
import ShareLocationIcon from '@mui/icons-material/ShareLocation';

interface BranchTabsType {
  branches?: BranchDataType[]
}

export default function BranchTabs({
  branches,
}: BranchTabsType) {
  const [value, setValue] = React.useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!branches) {
    return null;
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="branch-tab-list">
            {branches.map((branch, index) => (
              <Tab label={branch.branchName} value={index.toString()} key={index.toString()} />
            ))}
          </TabList>
        </Box>
        {branches.map((branch, index) => (
          <TabPanel value={index.toString()} key={index.toString()}>
            <List>
              {/* 日期 */}
              {
                branch.date?.map((d, dateIndex) => (
                  <ListItem key={`date-${dateIndex.toString()}`}>
                    <ListItemIcon><AlarmOnIcon /></ListItemIcon>
                    <ListItemText>{d.name}</ListItemText>
                    <ListSubheader>
                      {d.start?.toString()}
                      ~
                      {d.end?.toString()}
                    </ListSubheader>

                  </ListItem>
                ))
              }
              {/* 地點 */}
              <ListItem>
                <ListItemIcon><ShareLocationIcon /></ListItemIcon>
                <ListItemText>活動地點</ListItemText>
                {
                  branch.location?.map((l, locationIndex) => (
                    <ListSubheader key={`location-${locationIndex}`}>
                      {l}
                    </ListSubheader>
                  ))
                }
              </ListItem>

            </List>
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
