import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  List, ListItem, ListItemIcon, ListItemText, Collapse
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';

function SideBar() {

  const [open, setOpen] = useState(false);

  let userRole = "user" ;
  const {user} = useSelector((state) => state.userLogin);

  if(user){
    userRole = user.userDetails.role;
    console.log("user dashboard", user.userDetails.role);
  }
  


  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className='p-4'>
      <Link to="/">
        <h2 className='font-bold text-3xl'>GrowthCode</h2>
      </Link>
    
      {( userRole === 'admin' &&
        <div > 
          <p className='mt-4 p-2'>
            <DashboardIcon /> ADMIN DASHBOARD
          </p>
        </div>
      )}
      { userRole === 'admin' && (
        <List component="nav" className='mt-4 p-2 bg-black text-white rounded-lg'>
          <ListItem onClick={handleClick}>
            <ListItemIcon>
              <ImportExportIcon />
            </ListItemIcon>
            <ListItemText className='cursor-pointer' primary="Products" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to="/admin/products" style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem>
                  <ListItemIcon>
                    <PostAddIcon />
                  </ListItemIcon>
                  <ListItemText className='hover:underline' primary="All Product" />
                </ListItem>
              </Link>
              <Link to="/admin/product" style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItem>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <Link to="/admin/createProduct">
                    <ListItemText className='hover:underline' primary="Create" />
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <Link to="/admin/orders">
                    <ListItemText className='hover:underline' primary="Orders" />
                  </Link>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <Link to="/admin/users">
                    <ListItemText className='hover:underline' primary="Users" />
                  </Link>
                </ListItem>
              </Link>
            </List>
          </Collapse>
        </List>
      )}
      <Link to="/profile">
        <p className='mt-4 p-2 hover:bg-black hover:text-white hover:rounded-lg'>
          <PeopleIcon /> Profile
        </p>
      </Link>
      <Link to="/orders">
        <p className='mt-4 p-2 hover:bg-black hover:text-white hover:rounded-lg'>
          <ListAltIcon /> Orders
        </p>
      </Link>
      <Link to="/userCart">
        <p className='mt-4 p-2 hover:bg-black hover:text-white hover:rounded-lg'>
          <ShoppingCartIcon /> Your Cart
        </p>
      </Link>
    </div>
  );
}

export default SideBar;
