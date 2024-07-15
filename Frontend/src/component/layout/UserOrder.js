import React, { Fragment, useEffect, useState } from 'react';
import SideBar from '../admin/SideBar';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrder } from '../../reducers/OrderSlice';
import MenuIcon from '@mui/icons-material/Menu';

function UserOrder() {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserOrder());
  }, [dispatch]);

  if (loading) {
    return <p>Fetching your orders....</p>;
  }

  if (error) {
    return <div>Error: {error.message || 'Something went wrong'}</div>; // Improved error handling
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ORDER ID',
      minWidth: 150,
      flex: 0.5,
      headerClassName: 'bold-header',
    },
    {
      field: 'date',
      headerName: 'ORDER DATE',
      minWidth: 100,
      flex: 0.3,
      headerClassName: 'bold-header',
    },
    {
      field: 'status',
      headerName: 'ORDER STATUS',
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
      field: 'itemQty',
      headerName: 'ITEM QTY.',
      type: 'number',
      minWidth: 100,
      flex: 0.5,
      headerClassName: 'bold-header',
    },
    {
      field: 'amount',
      headerName: 'AMOUNT',
      minWidth: 150,
      type: 'number',
      flex: 0.3,
      headerClassName: 'bold-header',
    },
    
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    date: new Date(order.paidAt).toDateString(),
    status: order.orderStatus,
    itemQty: order.orderItems.length,
    amount: order.totalPrice,
  }));

  return (
    <Fragment>
      <div className="relative mt-2 flex flex-col lg:flex-row w-full ">
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block w-full lg:w-1/5`}>
          <SideBar />
        </div>
        <div className="flex-grow bg-[#EEEEEE] p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-start flex-col w-full">
              <button
                className="lg:hidden mr-4"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <MenuIcon />
              </button>
              <h2 className="text-2xl md:text-4xl font-bold mt-4">Your Orders</h2>
            </div>
          </div>
          <div className="bg-white mt-8 rounded-xl shadow-md h-[calc(100vh-200px)]"> {/* Adjusted height */}
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight={false}
              getRowClassName={(params) => (params.index === 0 ? 'first-row' : '')}
            />
          </div>
          
        </div>
      </div>
    </Fragment>
  );
}

export default UserOrder;
