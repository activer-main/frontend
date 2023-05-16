import React from 'react';
import {
  Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import navigations from '../navigations';

function MobileNavigation() {
  const [open, setOpen] = React.useState<boolean>(false);

  return (
    <>
      <IconButton aria-label="menu" onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
      >
        <List>
          {navigations.map((nav) => (
            <ListItem key={nav.label} disablePadding>
              <ListItemButton component="a" href={nav.link}>
                <ListItemIcon>
                  {nav.icon}
                </ListItemIcon>
                <ListItemText primary={nav.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default MobileNavigation;
