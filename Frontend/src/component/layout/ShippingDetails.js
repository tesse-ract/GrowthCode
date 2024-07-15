import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../reducers/AddToCart";
import ShippingStatus from './ShippingStatus';

function ShippingDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userLogin);

  useEffect(() => {
    console.log("user in shipping", user);
    if (!user) {
      navigate('/signIn');
    }
  }, [user]);

  const [shippingDetails, setShippingDetails] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    phoneNo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingDetails));
    navigate('/shippingInfo');
  };

  return (
    <Fragment>
      <div className='w-full mt-10'>
        <div className='shippingDetails'>
          <ShippingStatus activeStep={0} />

          <div className='w-full h-fit flex justify-center mb-20'>
            <div className="mt-10 shippingContainer p-4 border-2 border-[#0000001a] w-full sm:w-3/4 lg:w-1/2 xl:w-1/3 rounded-2xl mx-4 xs:mx-8 md:mx-24">
              <div>
                <h2 className='text-2xl font-bold text-center mb-5 '>Shipping Details</h2>
              </div>
              <form onSubmit={submitHandler}>
                <input className='border-2 border-[#0000001a] block w-full p-4 mb-4 rounded-lg' placeholder='Address' name="address" value={shippingDetails.address} onChange={handleInputChange} />
                <input className='border-2 border-[#0000001a] block w-full p-4 mb-4 rounded-lg' placeholder='City' name="city" value={shippingDetails.city} onChange={handleInputChange} />
                <input className='border-2 border-[#0000001a] block w-full p-4 mb-4 rounded-lg' placeholder='State' name="state" value={shippingDetails.state} onChange={handleInputChange} />
                <input className='border-2 border-[#0000001a] block w-full p-4 mb-4 rounded-lg' placeholder='Country' name="country" value={shippingDetails.country} onChange={handleInputChange} />
                <input className='border-2 border-[#0000001a] block w-full p-4 mb-4 rounded-lg' placeholder='Pin Code' name="pinCode" value={shippingDetails.pinCode} onChange={handleInputChange} />
                <input className='border-2 border-[#0000001a] block w-full p-4 mb-4 rounded-lg' placeholder='Phone Number' name="phoneNo" value={shippingDetails.phoneNo} onChange={handleInputChange} />

                <button type="submit" className='bg-black w-full rounded-lg p-4 font-bold text-white'>
                  Continue &rarr;
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default ShippingDetails;
