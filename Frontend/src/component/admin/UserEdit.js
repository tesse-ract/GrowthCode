import React, { Fragment, useEffect, useState } from 'react';
import SideBar from './SideBar';
import { updateUserRole, fetchSingleUser } from '../../reducers/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function UserEdit() {
  const [save, setSave] = useState(false);
  const [update, setUpdate] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { id } = useParams(); // Retrieve the order ID from the URL
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleUser(id));
    }
  }, [dispatch, update, id]);

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    if (user && user._id) {
      dispatch(updateUserRole({ id: user._id, role: newRole }));
    }
    setUpdate(true);
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

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-lg font-semibold text-center">Error: {renderError(error)}</p>;
  }

  if (!user) {
    return <p>User cannot update right now</p>;
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
              
            </div>
            <h2 className="md:w-full text-3xl font-bold mt-4">{user.name}</h2>
          </div>

          <div className="bg-white mt-8 rounded-xl h-3/6 shadow-md flex justify-center flex-col w-full md:w-3/4 lg:w-1/2 mx-auto">
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
                  <select
                    className="border-2 border-black p-1 rounded-lg"
                    id="role"
                    name="role"
                    onChange={handleRoleChange}
                    defaultValue={user ? user.role : ""}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <p className="p-1 rounded-lg">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center mt-6">
              <div
                className="mt-6 bg-black rounded-lg text-white w-40 text-center p-3 px-6 cursor-pointer"
                onClick={() => setSave(true)}
              >
                {!save ? <p><b>Save</b></p> : <p><b>Saved</b></p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UserEdit;
