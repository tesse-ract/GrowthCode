import React, { Fragment, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SideBar from './SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser } from '../../reducers/UserSlice';
import MenuIcon from '@mui/icons-material/Menu';

function UsersDetails() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSingleUser(id));
  }, [dispatch, id]);

  const { user, loading, error } = useSelector((state) => state.user);

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {renderError(error)}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <Fragment>
      <div className="relative mt-2 grid grid-cols-1 md:grid-cols-[1fr_5fr] w-full h-screen">
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
          <SideBar />
        </div>

        <div className="bg-[#EEEEEE] p-6 w-full">
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex items-center">
              <button
                className="md:hidden mr-4"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <MenuIcon />
              </button>
             
              
            </div>
            <div className='w-full '>
            <h2 className=" md:w-full text-3xl font-bold mt-4">{user.name}
            </h2>
              </div>
            <div className="mt-4 items-end w-full  flex justify-end">
              <Link to={`/admin/users/details/edit/${id}`} className="bg-black text-white p-4 rounded-lg">
                <i className="fa-solid fa-pen-to-square"></i> Edit
              </Link>
            </div>
          </div>

          <div className="bg-white mt-8 rounded-xl shadow-md flex justify-center flex-col w-full md:w-3/4 lg:w-1/2 mx-auto p-4">
            <div className="shippingInfo flex flex-col flex-wrap w-full md:w-3/4 justify-center mx-auto">
              <div>
                <h2 className="font-bold text-3xl mb-4 text-center underline">User Details</h2>
              </div>

              <div className="flex  md:flex-row justify-around mt-3 w-full">
                <div className="flex flex-col justify-between">
                  <p className="font-semibold md:text-xl">User ID</p>
                  <p className="md:text-xl font-semibold mt-4">Name</p>
                  <p className="md:text-xl font-semibold mt-4">Role</p>
                  <p className="md:text-xl font-semibold mt-4">Email-ID</p>
                </div>
                <div className="flex flex-col justify-between items-center md:ml-4">
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                <div className="flex flex-col justify-between">
                  <p className="p-1 rounded-lg">{user._id}</p>
                  <p className="p-1 rounded-lg">{user.name}</p>
                  <p className="p-1 rounded-lg">{user.role}</p>
                  <p className="p-1 rounded-lg">{user.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UsersDetails;
