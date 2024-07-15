import React, { Fragment, useEffect, useState } from 'react';
import SideBar from './SideBar';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, deleteUser } from '../../reducers/UserSlice';
import MenuIcon from '@mui/icons-material/Menu';

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch all users when the component mounts
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDeleteUser = (params) => {
    return () => {
      console.log("user dlt id->", params);
      dispatch(deleteUser(params)).then(() => {
        dispatch(fetchAllUsers());
      }).catch(error => {
        console.error("Error deleting user:", error);
      });
    };
  };

  const columns = [
    {
      field: "id",
      headerName: "USER ID",
      minWidth: 150,
      flex: 0.5,
      headerClassName: 'bold-header',
    },
    {
      field: "name",
      headerName: "USER NAME",
      minWidth: 100,
      flex: 0.3,
      headerClassName: 'bold-header',
    },
    {
      field: "role",
      headerName: "ROLE",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      headerClassName: 'bold-header',
    },
    {
      field: "email",
      headerName: "EMAIL",
      type: "number",
      minWidth: 100,
      flex: 0.5,
      headerClassName: 'bold-header',
    },
    {
      field: "action",
      flex: 0.3,
      headerName: "ACTION",
      minWidth: 150,
      type: "number",
      sortable: false,
      headerClassName: 'bold-header',
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/users/${params.id}`}>
              <EditIcon style={{ cursor: 'pointer', marginRight: '10px' }} />
            </Link>
            <Button>
              <div onClick={handleDeleteUser(params.id)}>
                <DeleteIcon style={{ color: "red", cursor: 'pointer', marginRight: '10px' }} />
              </div>
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const navigate = useNavigate();
  const handleRowClick = (params) => {
    navigate(`/admin/users/${params.id}`);
  };

  const rows = users.map((user) => ({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: new Date(user.createdAt).toLocaleDateString(), // Format date if needed
  }));

  return (
    <Fragment>
      <div className='relative mt-2 grid grid-cols-1 md:grid-cols-[1fr_5fr] w-full h-screen'>
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
          <SideBar />
        </div>

        <div className='bg-[#EEEEEE] p-6 w-full'>
          <div className='flex flex-col md:flex-row justify-between'>
            <div className='flex items-center'>
              <button
                className='md:hidden mr-4'
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <MenuIcon />
              </button>
              <h2 className='text-4xl font-bold mt-4'>
                All Users
              </h2>
            </div>
          </div>

          <div className='bg-white mt-8 rounded-xl shadow-md cursor-pointer overflow-auto h-[700px]'>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Users;
