import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className="footer w-full bg-gray-100 py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:items-start px-4">
        <div className="footer-content w-full md:w-10/12 flex flex-col md:flex-row items-center md:items-start text-center md:text-left mt-10 md:mt-0 justify-between">
          <div className="text-3xl font-bold mx-3 md:mb-0 mb-4">
            <Link to="/">GrowthCode</Link>
          </div>
          <div className="max-w-xs mx-3 mt-4 md:mt-0">
            <p className='text-[#00000099]'>The one stop solution to ace Marketing</p>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <i className="fa-brands fa-twitter text-lg"></i>
            <i className="fa-brands fa-facebook text-lg"></i>
            <i className="fa-brands fa-instagram text-lg"></i>
            <i className="fa-brands fa-github text-lg"></i>
          </div>
        </div>

        <div className="mt-10 md:mt-0 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <Link className="mx-2 font-semibold" to="/">HOME</Link>
          <Link className="mx-2 font-semibold" to="/product">PRODUCT</Link>
          {/* <Link className="mx-2 font-semibold" to="#">ABOUT</Link>
          <Link className="mx-2 font-semibold" to="#">CONTACT</Link> */}
        </div>
      </div>

      <div className="line-footer mx-auto my-4 w-4/5 border-t border-gray-300"></div>

      <p className="copyright text-center text-sm text-gray-600">
        GrowthCode © 2000-2024, All Rights Reserved
      </p>
    </div>
  );
}
