import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchOrderDetails, updateOrderStatus } from '../../reducers/AdminSlice';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from './SideBar';

function OrderDetails() {
  const { id } = useParams(); // Retrieve the order ID from the URL
  const dispatch = useDispatch();

  const { order, loading, error } = useSelector((state) => state.product); // Ensure correct state path
  console.log("orderDetails->", order);
  console.log("orderDetails type->", typeof(order));

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetails(id));
    }
  }, [dispatch, id]);


  const handleStatusChange = (e) => {
    console.log("update clicked");
    const newStatus = e.target.value;
    if (order && order._id) {
      dispatch(updateOrderStatus({ orderId: order._id, status: newStatus }));
    }
    console.log("update Done");
  };


  const renderError = (error) => {
    if (error && typeof error === 'object' && 'message' in error) {
      return error.message;
    }
    if (typeof error === 'object' && error !== null) {
      return JSON.stringify(error);
    }
    return 'An unknown error occurred';
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-lg font-semibold text-center">Error: {renderError(error)}</p>;
  }

  if (!order) {
    return <p>No order found.</p>;
  }

  const {
    user,
    shippingInfo = {},
    paymentInfo = {},
    _id,
    totalPrice,
    orderStatus,
  } = order;

  const { address, city, state, country, pinCode, phoneNo } = shippingInfo;
  const { status: paymentStatus } = paymentInfo;

  return (
    <Fragment>
      <div className='mt-2 grid grid-cols-[1fr_5fr] w-full h-screen'>
        <div>
          <SideBar />
        </div>
        <div className='bg-[#EEEEEE] p-6'>
          <div className='flex flex-row justify-between'>
            <div>
              <h2 className='text-4xl font-bold mt-4'>#{_id}</h2>
            </div>
          </div>
          <div className='bg-white mt-8 rounded-xl h-4/6 shadow-md'>
            <div className='upper flex flex-row justify-evenly flex-1 w-full basis-1/2 pt-10'>
              <div className='userInfo'>
                <div className='border-2 border-black p-4 h-fit rounded-xl w-[480px] mr-6'>
                  <h2 className='font-bold text-2xl mb-2'>Shipping Info</h2>
                  <div className="flex flex-row justify-around mt-3">
                    <div className='flex flex-col justify-between'>
                      <p className='font-semibold text-xl mb-2'>Name</p>
                      <p className='text-xl font-semibold mb-2'>Phone</p>
                      <p className='text-xl font-semibold'>Address</p>
                    </div>
                    <div className='flex flex-col justify-between items-center'>
                      <p>:</p>
                      <p>:</p>
                      <p>:</p>
                    </div>
                    <div className='flex flex-col justify-between'>
                      <span>{user || 'N/A'}</span>
                      <span>{phoneNo || 'N/A'}</span>
                      <span>{`${address || 'N/A'}, ${city || 'N/A'}, ${state || 'N/A'}, ${country || 'N/A'}, ${pinCode || 'N/A'}`}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='border-2 border-black p-4 h-fit rounded-xl w-[380px]'>
                <h2 className='font-bold text-2xl mb-2'>Payment Info</h2>
                <div className="flex flex-row justify-around mt-3">
                  <div className='flex flex-col justify-between'>
                    <p className='font-semibold text-xl mb-2'>Status</p>
                    <p className='text-xl font-semibold mb-2'>Amount</p>
                  </div>
                  <div className='flex flex-col justify-between items-center'>
                    <p>:</p>
                    <p>:</p>
                  </div>
                  <div className='flex flex-col justify-between'>
                    <span className='text-green-500 font-bold'>{paymentStatus || 'N/A'}</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='lower flex flex-row justify-evenly flex-1 w-full basis-1/2 pt-10'>
              <div className='statusInfo'>
                <div className='border-2 border-black p-4 h-fit rounded-xl w-[480px] mr-6'>
                  <h2 className='font-bold text-2xl mb-2'>Order Status</h2>
                  <div className="flex flex-row justify-around mt-3">
                    <div className='flex flex-col justify-between'>
                      <p className='font-semibold text-xl mb-2'>Status</p>
                    </div>
                    <div className='flex flex-col justify-between items-center'>
                      <p>:</p>
                    </div>
                    <div className='flex flex-col justify-between'>
                      <span>{orderStatus}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='border-2 border-black p-4 h-fit rounded-xl w-[380px]'>
                <h2 className='font-bold text-2xl mb-2'>Process Order</h2>
                <div className="flex flex-row justify-around mt-3">
                  <div className='flex flex-col justify-between'>
                    <p className='font-semibold text-xl mb-2'>Status</p>
                  </div>
                  <div className='flex flex-col justify-between items-center'>
                    <p>:</p>
                  </div>
                  <div className='flex flex-col justify-between'>
                    <span>
                      <select className='border-2 border-black p-2 rounded-lg' id="status" name="status" onChange={handleStatusChange} value={orderStatus}>
                        <option value="processing">Processing</option>
                        <option value="shipping">Shipping</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full flex justify-center mt-6'>
              <p className="mt-6 bg-black rounded-lg text-white w-40 text-center p-3 px-6 cursor-pointer">
                <Link to='/admin/orders'>
                Save
                </Link>
                
                </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default OrderDetails;
