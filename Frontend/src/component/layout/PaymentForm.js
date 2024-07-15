import {React, useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { createOrder } from '../../reducers/OrderSlice';
import { fetchProfileDetails } from '../../reducers/ProfileSlice';

const PaymentForm = ({ clientSecret }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const { items: cartItems = [] } = useSelector((state) => state.cart);

  const shippingInfo = useSelector((state) => state.cart.shippingInfo);
  console.log("shipping info in paymentForm", shippingInfo);

  useEffect(() => {
    dispatch(fetchProfileDetails());
  }, [dispatch]);

  const { user} = useSelector((state) => state.userLogin);
  console.log("user in paymentForm", user);

  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const taxPrice = 0.18 * itemsPrice;
  const shippingPrice = 20;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: itemsPrice,
    taxPrice: taxPrice,
    shippingPrice: shippingPrice,
    totalPrice: totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("Submit handler called");
    if (!stripe || !elements || !clientSecret) return;
    console.log("Submit handler no return ");
    setIsProcessing(true)
    const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url:`${window.location.origin}/success`,
        
          payment_method_data: {
            billing_details: {
              name: user.userDetails.name,
              email: user.userDetails.email,
              phone: shippingInfo.phone,
              address: {
                line1: shippingInfo.address,
                line2: shippingInfo.state,
                city: shippingInfo.city,
                postal_code: shippingInfo.pinCode,
                country: 'IN',
              },
            },
          },
          
        },
        redirect: 'if_required',
        
      });

      console.log("confirm payment done")
    if (error) {
      console.error("Error in payment:", error);
    } else {
        console.log("else condition executing")
        const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
        console.log("paymentIntent is->",paymentIntent)
        if (paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: paymentIntent.id,
            status: paymentIntent.status,
          };
          console.log("Order before dispatch:", order); // Log order details
          dispatch(createOrder(order));
          navigate("/success");
        } else {
          console.error("There's some issue while processing payment");
        }
        setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      <button type="submit" disabled={isProcessing} className="bg-black w-full rounded-lg p-4 font-bold text-white mt-8">
       {isProcessing? ("Processing..."):(" Pay - Rs.")} {!isProcessing && totalPrice.toFixed(2)}
      </button>
    </form>
  );
};

export default PaymentForm;
