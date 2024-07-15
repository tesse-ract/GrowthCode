import React, { Fragment, useEffect, useState } from 'react';
import SideBar from './SideBar';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminProduct } from '../../reducers/AdminSlice';
import { deleteProduct } from '../../reducers/productSlice';
import MenuIcon from '@mui/icons-material/Menu';

function ProductList() {
  const dispatch = useDispatch();
  const [isDelete, setIsDelete] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { products = [], loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchAdminProduct());
  }, [dispatch]);

  const handleDeleteProduct = (productId) => {
    setIsDelete(true);
    dispatch(deleteProduct(productId))
      .then(() => {
        dispatch(fetchAdminProduct());
        setIsDelete(false);
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  const columns = [
    {
      field: "id",
      headerName: "Product ID",
      minWidth: 200,
      flex: 0.5,
      headerClassName: 'bold-header',
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
      headerClassName: 'bold-header',
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      headerClassName: 'bold-header',
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
      headerClassName: 'bold-header',
    },
    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      headerClassName: 'bold-header',
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/products/${params.id}`}>
            <EditIcon style={{ cursor: 'pointer', marginRight: '10px' }} />
          </Link>
          <Button onClick={() => handleDeleteProduct(params.id)}>
            {!isDelete ? (<DeleteIcon style={{ color: "red", cursor: 'pointer', marginRight: '10px' }} />):(<p>Deleting...</p>)}
          </Button>
        </Fragment>
      ),
    },
  ];

  const rows = products.map((product) => ({
    id: product._id,
    stock: product.stock,
    price: product.price,
    name: product.name,
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
              <h2 className='text-4xl font-bold mt-4'>List of Product</h2>
            </div>
            <div className='mt-4'>
              <Link to="/admin/createProduct" className="bg-black text-white p-4 rounded-lg">+ Add Product</Link>
            </div>
          </div>
          <div className='bg-white mt-8 rounded-xl shadow-md overflow-auto h-[700px]'>
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
              />
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductList;
