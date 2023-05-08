import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { orderByUnion, sortByUnion } from 'types/request';

const navigations = [
  {
    link: '/search',
    icon: <SearchIcon />,
    label: '搜尋活動',
  },
  {
    link: `/surf?sortBy=${sortByUnion[sortByUnion.activityClickedCount]}&orderBy=${orderByUnion[orderByUnion.descending]}`,
    icon: <FindInPageIcon />,
    label: '熱門活動',
  },
];

export default navigations;
