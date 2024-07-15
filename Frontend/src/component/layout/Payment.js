import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ShippingStatus from './ShippingStatus';
import axios from 'axios';
import PaymentForm from './PaymentForm';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState(null);
  
  useEffect(() => {
    const fetchStripeApiKey = async () => {
      try {
        const response = await axios.get("https://growthcode-backend-2.onrender.com/api/v1/stripeApiKey", {
          withCredentials: true
        });
        const {stripeApiKey} = response.data;
        console.log("stripeApiKey key->", stripeApiKey);
        setStripePromise(loadStripe(stripeApiKey));
      } catch (error) {
        console.error("Error in stripeApiKey fetching:", error);
      }
    };

    fetchStripeApiKey();
  }, []);

  const navigate = useNavigate();
  const {user} = useSelector((state) => state.userLogin);
  useEffect(()=>{
    if(user === null){
      navigate('/signIn');
    }
  }, [user, navigate])
  console.log("user in payment", user);
  
  
  const shippingInfo = useSelector((state) => state.cart.shippingInfo);
  console.log("shipping info in payment", shippingInfo);
  
  
  
  const { items: cartItems = [] } = useSelector((state) => state.cart);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxPrice = 0.18 * itemsPrice;
  const shippingPrice = 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  useEffect(() => {
    const paymentData = {
      amount: Math.round(totalPrice * 100),
      description: "my order for 200 tanks",
    };

    const initializePayment = async () => {
      try {
        const response = await axios.post("https://growthcode-backend-2.onrender.com/api/v1/payment/process", paymentData, {
          withCredentials: true
        });
        const { clientSecret } = response.data;
        console.log("clientSecret key->", clientSecret);
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Error initializing payment:", error);
      }
    };

    initializePayment();
  }, [totalPrice, user?.userDetails?.name, user?.userDetails?.email, shippingInfo.address, shippingInfo.phone]);
  
  return (
    <Fragment>
      <div className="my-10 mb-[140px] min-h-80">
        <ShippingStatus activeStep={2} />
        <div className="flex justify-center">
          <div className="mt-10 mx-4 xs:mx-12 p-4 border-2 border-[#0000001a] w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-2xl">
            <h2 className="text-2xl font-bold text-center mb-5">Your Card Info</h2>
            {clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <PaymentForm clientSecret={clientSecret} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Payment;
