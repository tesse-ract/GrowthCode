import React, { Fragment, useState } from 'react';
import SideBar from '../admin/SideBar';
import CartProduct from './image/CartProduct';
import MenuIcon from '@mui/icons-material/Menu';

function UserCart() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Fragment>
      <div className="relative mt-2 flex flex-col md:flex-row w-full h-screen">
        <div className={`${isSidebarOpen ? 'block' : 'hidden'} md:block w-full md:w-1/5`}>
          <SideBar />
        </div>
        <div className="flex-grow bg-[#EEEEEE] p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-start w-full">
              <button
                className="md:hidden mr-4"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <MenuIcon />
              </button>
              <h2 className="text-2xl md:text-4xl font-bold mt-4">Your Cart</h2>
            </div>
          </div>
          <div className="bg-white mt-8 rounded-xl shadow-md overflow-auto h-[70vh] md:h-5/6">
            <CartProduct />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UserCart;
