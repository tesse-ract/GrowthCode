import React, { Fragment, useEffect, useState } from 'react';
import SideBar from '../admin/SideBar';
import { Link } from 'react-router-dom';
import myPic from './image/my-pic2.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileDetails } from '../../reducers/ProfileSlice';
import MenuIcon from '@mui/icons-material/Menu';

function Profile() {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);

  const { user, loading } = useSelector((state) => state.profile);

  console.log("user profile", user);
  if (loading) {
    return <p>Fetching your profile data...</p>;
  }

  const renderError = (error) => {
    if (error && typeof error === 'object' && 'message' in error) {
      return error.message;
    }
    if (typeof error === 'object' && error !== null) {
      return JSON.stringify(error);
    }
    return 'An unknown error occurred';
  };

  if (!user) {
    return <p>No user data available. Please login.</p>;
  } else {
    console.log("user profile ", user);
  }

  return (
    <Fragment>
      <div className="relative mt-2 grid grid-cols-1 md:grid-cols-[1fr_5fr] w-full h-screen">
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
          <SideBar />
        </div>

        <div className="bg-[#EEEEEE] p-6 w-full">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="flex items-center">
              <button
                className="md:hidden mr-4"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <MenuIcon />
              </button>
              <h2 className="text-4xl font-bold mt-4">My Profile</h2>
            </div>
            <div className="mt-4 flex">
              <Link
                to={`/users/details/edit/${user._id}`}
                className="bg-black text-white p-2 md:p-4 rounded-lg mr-2"
              >
                <i className="fa-solid fa-pen-to-square"></i> Change Password
              </Link>
              <Link
                to={`/users/details/edit/${user._id}`}
                className="bg-black text-white p-2 md:p-4 rounded-lg ml-2"
              >
                <i className="fa-solid fa-pen-to-square"></i> Edit
              </Link>
            </div>
          </div>

          <div className="bg-white mt-8 rounded-xl shadow-md flex justify-center flex-col w-full md:w-3/4 mx-auto pb-4 sm:w-3/4 lg:w-3/4">
            <div className="userProfile flex justify-center mb-4 mt-4">
              <img
                className="rounded-full border-2 bg-black w-60 h-60"
                src={user?.avatar?.url || myPic}
                alt="Profile"
              />

            </div>

            <div className=" flex flex-col md:flex-row flex-wrap w-3/4 justify-center mx-auto">
              <div className="flex  md:flex-row justify-around mt-3 w-full">
                <div className="flex flex-col justify-between">
                  <p className="text-lg md:text-xl font-semibold mb-2">Name</p>
                  <p className="text-lg md:text-xl font-semibold mb-2">Email-ID</p>
                  <p className="text-lg md:text-xl font-semibold">Joined On</p>
                </div>
                <div className="flex flex-col justify-between items-center md:ml-4">
                  <p>:</p>
                  <p>:</p>
                  <p>:</p>
                </div>
                <div className="flex flex-col justify-between">
                  <span className="p-1">{user.name}</span>
                  <span className="p-1">{user.email}</span>
                  <span className="p-1">{new Date(user.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Fragment>
  );
}

export default Profile;
