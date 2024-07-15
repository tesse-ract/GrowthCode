import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SideBar from './SideBar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { fetchAdminOrder, deleteOrder } from '../../reducers/AdminSlice';
import { useDispatch, useSelector } from 'react-redux';
import MenuIcon from '@mui/icons-material/Menu';

function Orders() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.product);
  

  useEffect(() => {
    dispatch(fetchAdminOrder());
  }, [dispatch]);

  const handleDeleteOrder = (productId) => {
    setIsDelete(true);
    dispatch(deleteOrder(productId))
      .then(() => {
        dispatch(fetchAdminOrder());
        setIsDelete(false);
      })
      .catch((error) => {
        console.error("Error deleting Order:", error);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "ORDER ID",
      minWidth: 150,
      flex: 0.5,
      headerClassName: 'bold-header',
    },
    {
      field: "date",
      headerName: "ORDER DATE",
      minWidth: 100,
      flex: 0.3,
      headerClassName: 'bold-header',
    },
    {
      field: "status",
      headerName: "ORDER STATUS",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      headerClassName: 'bold-header',
      renderCell: (params) => {
        const status = params.value;
        return (
          <span style={{ backgroundColor: status === 'Delivered' ? '#32c53c' : 'yellow', fontWeight: 'bold' }}>
            {status}
          </span>
        );
      },
    },
    {
      field: "itemQty",
      headerName: "ITEM QTY.",
      type: "number",
      minWidth: 100,
      flex: 0.5,
      headerClassName: 'bold-header',
    },
    {
      field: "amount",
      flex: 0.3,
      headerName: "AMOUNT",
      minWidth: 150,
      type: "number",
      headerClassName: 'bold-header',
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "ACTION",
      minWidth: 150,
      type: "number",
      sortable: false,
      headerClassName: 'bold-header',
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/order/details/${params.id}`}>
            <EditIcon style={{ cursor: 'pointer', marginRight: '10px' }} />
          </Link>
          <Button onClick={() => handleDeleteOrder(params.id)}>
            {!isDelete ? (<DeleteIcon style={{ color: "red", cursor: 'pointer', marginRight: '10px' }} />):(<p>Deleting...</p>)}
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    date: new Date(order.paidAt).toDateString(),
    status: order.orderStatus,
    itemQty: order.orderItems.length,
    amount: order.totalPrice,
  }));

  const renderError = (error) => {
    if (error && typeof error === 'object' && 'message' in error) {
      return error.message;
    }
    if (typeof error === 'object' && error !== null) {
      return JSON.stringify(error);
    }
    return 'An unknown error occurred';
  };

  // const handleRowClick = (params) => {
  //   navigate(`/admin/order/details/${params.id}`);
  // };

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
                All Orders
              </h2>
            </div>
          </div>

          <div className='bg-white mt-8 rounded-xl shadow-md cursor-pointer overflow-auto h-[700px]'>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className='text-red-500 text-lg font-semibold text-center'>Error: {renderError(error)}</p>
            ) : (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
                // onRowClick={handleRowClick}
                getRowClassName={(params) => params.index === 0 ? 'first-row' : ''}
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Orders;
