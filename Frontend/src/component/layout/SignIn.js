import React, { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { userLogin } from '../../reducers/userSlice/UserLogin'
import { useDispatch, useSelector } from 'react-redux';

function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const { error, user, loading, success } = useSelector((state) => state.userLogin);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin({ email, password }))
      .then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          console.log("login result", user)
          navigate('/');
        }
      });

  }
  return (
    <Fragment>
      <div className='flex flex-col mt-4 w-11/12 mx-auto md:flex-row'>
        <div className='login flex-1 p-4 border-2 border-[#0000001a] rounded-xl mb-4'>

          <div className='flex flex-col md:flex-row md:justify-between items-center mb-4'>
            <div className='w-full md:w-1/2'>
              <p className='text-3xl font-bold text-center md:text-start'>GrowthCode</p>
            </div>
            <div className='text-lg mt-4 md:mt-0 md:flex md:items-center'>
              <span>don't have an account? </span>
              <Link to='/signUp' className='text-green-500 md:ml-1'>Sign Up!</Link>
            </div>
          </div>



          <div className='flex h-auto justify-center items-center'>
            <div className='loginPage w-full sm:w-3/4 md:w-1/2 lg:w-1/3 border-2 border-[#0000001a] h-fit p-6 rounded-2xl'>

              <div><h2 className='text-4xl font-bold text-center'>Welcome Back</h2></div>
              <div><h2 className='text-xl text-center mb-6'>Login into Account</h2></div>
              <form onSubmit={handleLogin} >

                <input className='border-2 border-[#0000001a] block w-full p-4 mb-8 rounded-lg' placeholder='Email'
                required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />

                <input className='border-2 border-[#0000001a] block w-full p-4 mb-4 rounded-lg' placeholder='Password'
                required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />

                <h2 className='text-red-500 text-right mb-10 h-6'></h2>
                <button className='border-2 border-white bg-black text-white w-full rounded-lg p-4 mb-4' type='submit'>Log In</button>

              </form>

              {loading && <p className='text-xl text-center'>Login to your Account...</p>}
              {success && <p className='text-green-500 text-xl text-center p-2 font-bold'>Login successfully!</p>}
              {error && <p className='text-red-500 text-lg font-semibold text-center'>Error: {error?.message}</p>}

            </div>
          </div>

        </div>
      </div>
    </Fragment>
  )
}

export default SignIn
