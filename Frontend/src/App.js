import Header from './component/layout/Header.js'
import Footer from './component/layout/Footer.js';
import Home from './component/layout/Home.js';
import ProductDetails from './component/layout/ProductDetails.js';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Product from './component/layout/Product.js';
import CartProduct from './component/layout/image/CartProduct.js';
import SignIn from './component/layout/SignIn.js';
import SignUp from './component/layout/SignUp.js';
import ShippingDetails from './component/layout/ShippingDetails.js';
import ShippingInfo from './component/layout/ShippingInfo.js';
import Payment from './component/layout/Payment.js';
import SuccessOrder from './component/layout/SuccessOrder.js';
import Dashboard from './component/admin/Dashboard.js';
import ProductList from './component/admin/ProductList.js';
import Orders from './component/admin/Orders.js';
import Users from './component/admin/Users.js';
import Review from './component/admin/Review.js';
import CreateProduct from './component/admin/CreateProduct.js';
import OrderDetails from './component/admin/OrderDetails.js';
import UsersDetails from './component/admin/UsersDetails.js';
import UserEdit from './component/admin/UserEdit.js';
import Profile from './component/layout/Profile.js';
import UserOrder from './component/layout/UserOrder.js';
import UserCart from './component/layout/UserCart.js';
import Verification from './component/layout/Verification.js';
import axios from 'axios';
import { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
// import {loadStripe} from '@stripe/react-stripe-js'


function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApi(){
    const {data} = await axios.get('localhost:4000/api/v1/stripeApiKey');

    setStripeApiKey(data.stripeApi);
  }
  return (
    <Router>
      <Header />
      
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path='/product' element={<Product />} />
        <Route  path='/product/search/:keyword' element={<Product />} />
        <Route exact path='/cart' element={<CartProduct />} />
        <Route exact path='/signIn' element={<SignIn />} />
        <Route exact path='/verification' element={<Verification />} />
        <Route exact path='/signUp' element={<SignUp />} />
        <Route exact path='/shippingDetails' element={<ShippingDetails />} />
        <Route exact path='/shippingInfo' element={<ShippingInfo />} />

    
        <Route exact path='/payment' element={<Payment />} />
        

        <Route exact path='/success' element={<SuccessOrder />} />
        <Route exact path='/admin/dashboard' element={<Dashboard />} />
        <Route exact path='/admin/products' element={<ProductList />} />
        <Route exact path='/admin/orders' element={<Orders />} />
        <Route exact path='/admin/users' element={<Users />} />
        <Route exact path='/admin/reviews' element={<Review />} />
        <Route exact path='/admin/createProduct' element={<CreateProduct />} />
        <Route exact path='/admin/order/details/:id' element={<OrderDetails />} />
        <Route exact path='/admin/users/:id' element={<UsersDetails />} />
        <Route exact path='/admin/users/details/edit/:id' element={<UserEdit />} />
        <Route exact path='/profile' element={<Profile />} />
        <Route exact path='/users/details/edit/:id' element={<UserEdit />} />
        <Route exact path='/orders' element={<UserOrder />} />
        <Route exact path='/userCart' element={<UserCart />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
