import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { BranchDataType } from 'types/data';
import BranchProperties from '../BranchProperties';

interface BranchTabsType {
  branches: BranchDataType[]
}

export default function BranchTabs({
  branches,
}: BranchTabsType) {
  const [value, setValue] = React.useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="branch-tab-list">
            {branches.map((branch, index) => (
              <Tab label={branch.branchName} value={index.toString()} />
            ))}
          </TabList>
        </Box>
        {branches.map((branch, index) => (
          <TabPanel value={index.toString()}>
            <BranchProperties branch={branch} />
          </TabPanel>
        ))}
      </TabContext>
    </Box>
  );
}
