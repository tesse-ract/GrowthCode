import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createUser } from '../../reducers/userSlice/CreateUser';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [avatar, setAvatar] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState('/Profile.png');

  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.createUser);

  const registerDataChange = (e) => {
    const files = Array.from(e.target.files);
    const base64Images = [];

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          base64Images.push(reader.result);
          setAvatar(base64Images);
          setAvatarPreview(reader.result); // Update avatar preview here
        }
      };

      reader.readAsDataURL(file);
    });
  };

  if(error){
    console.log("error in signup", error);
  }

  const signUpHandler = (e) => {
    e.preventDefault();
    console.log('signup clicked');

    if (password !== cpassword) {
      alert('Passwords do not match');
      return;
    }

    if (avatar && avatar[0].length > 1024* 1024) { // 2MB in bytes
      alert('Avatar file size must be less than 500kb');
      return;
    }

    const myForm = new FormData();
    myForm.set('name', name);
    myForm.set('email', email);
    myForm.set('password', password);
    if (avatar) {
      myForm.append('avatar', avatar);
    }

    console.log("signup data", myForm);
    console.log("avatar data", typeof(avatar));

    dispatch(createUser(myForm)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        console.log('User created successfully');
        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');
        setAvatar(null);
        setAvatarPreview('/Profile.png');
      }
    });
  };

  return (
    <Fragment>
      <div className='flex justify-center mt-4 w-11/12 mx-auto '>
        <div className='h-4/6 w-full sm:w-8/12 lg:w-1/2 p-4 border-2 border-[#0000001a] rounded-xl mb-4'>
          <div className=' flex flex-col md:flex-row md:justify-between items-center mb-4'>
            <div className='w-full md:w-64 '>
              <p className='text-3xl font-bold text-center md:text-start'>GrowthCode</p>
            </div>
            <div className='text-lg mt-4 md:mt-0 md:w-full  md:text-end'>
              <span>Already have an account? 
                <Link to='/signIn' className='text-green-500 ml-1'>Sign In!</Link>
              </span>
            </div>
          </div>

          <div className='flex justify-center items-center'>
            <div className='loginPage w-full p-2 rounded-2xl'>
              <div><h2 className='text-2xl font-bold text-center'>Get Started With GrowthCode</h2></div>
              <div><h2 className='text-xl text-center mb-6'>Getting started is easy</h2></div>
              <form onSubmit={signUpHandler} id='submit' name=''>
                <input className='border-2 border-[#0000001a] block w-full p-4 mb-4 rounded-lg' placeholder='Full Name'
                required
                  value={name} onChange={(e) => setName(e.target.value)}
                />
                <input className='border-2 border-[#0000001a] block w-full p-4 mb-4 rounded-lg' placeholder='Email'
                required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <input className='border-2 border-[#0000001a] block w-full p-4 mb-4 rounded-lg' placeholder='Password'
                required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <input className='border-2 border-[#0000001a] block w-full p-4 mb-4 rounded-lg' placeholder='Confirm Password'
                required
                  value={cpassword} onChange={(e) => setCpassword(e.target.value)}
                />
                <div id="registerImage" className='flex flex-col items-center mb-4'>
                  <img src={avatarPreview} alt="prfile Preview" className='w-24 h-24 rounded-full mb-2' />
                  <p className='text-red-600'>(max size 500kb)</p>
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    required
                    onChange={registerDataChange}
                    className='block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100'
                  />
                </div>

                <button className='bg-green-500 w-full rounded-lg p-4 font-bold text-white'>Create Account</button>
              </form>
              {status === 'loading' && <p className='text-xl text-center'>Creating your Account...</p>}
              {status === 'succeeded' && (<p className='text-green-500 text-xl text-center p-2 font-bold'>User created successfully!</p>)}
              {error && status === 'failed' && (<p className='text-red-500 text-center text-lg font-semibold'>Errorr: {error.message}</p>)}
            </div>
          </div>

          <h2 className='text-sm text-center mt-4'>By continuing you indicate that you read and agreed to the Terms of Use</h2>
          {status === 'succeeded' && <p className='text-green-500 text-xl text-center p-2 font-bold'>Account created but not confirmed. Please check your email and confirm your account within 5 minutes.</p>}
        </div>
      </div>
    </Fragment>
  );
}

export default SignUp;
