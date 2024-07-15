import { Fragment, useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom";
import { verifyAccount } from "../../reducers/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";

function Verification() {

    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.profile);

    const handleConfirm = async (e) => {
        e.preventDefault();
        console.log("Value of input token:", token);
        dispatch(verifyAccount(token)).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
              navigate('/signIn');
            }
        });
    };

    if (user) {
        console.log("user verify ", user);
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

    return (
        <Fragment>
            <div className='flex flex-col items-center mt-4 w-11/12 mx-auto'>
                <div className='login flex-1 p-4 border-2 border-[#0000001a] rounded-xl mb-4 w-full max-w-lg'>

                    <div className='loginHeader flex flex-row justify-between mb-6'>
                        <div><p className='text-3xl font-bold'>GrowthCode</p></div>
                    </div>

                    <div className='flex justify-center items-center'>
                        <div className='loginPage w-full p-3 rounded-2xl bg-[#ececec] border-2 border-[#0000001a]'>

                            <div><h2 className='text-2xl md:text-4xl font-bold text-center mb-5'>Verify Your Account</h2></div>

                            <form onSubmit={handleConfirm}>

                                <input className='border-2 border-[#0000001a] block w-full p-3 md:p-4 mb-4 md:mb-8 rounded-lg' placeholder='Paste your Token here'
                                    value={token} onChange={(e) => setToken(e.target.value)}
                                />

                                {error && <p className='text-red-500 mb-4'>{renderError(error)}</p>}
                                {loading ? (
                                    <p>Verifying your Account.....</p>
                                ) : (
                                    <p></p>
                                )}
                                <button className='border-2 border-white bg-black text-white w-full rounded-lg p-3 md:p-4 mb-4' type='submit'>Verify</button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </Fragment>
    );
}

export default Verification;
