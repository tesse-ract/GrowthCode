import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../../reducers/userSlice/UserLogin';
import { useDispatch, useSelector } from 'react-redux';
import Search from './Search';
import p from './image/blank_profile.jpg'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    let link;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user, success }= useSelector((state) => state.userLogin);
    if(user ){
        console.log("user in header", user);
        if(user.userDetails.avatar){
            link = user.userDetails.avatar.url;
        }
        
    }
    
    const handleLogout = () => {
        console.log("logout clicked");
        dispatch(userLogout()).then((result) => {
            if (result.meta.requestStatus === 'fulfilled') {
                navigate('/');
            }
        });
    };

    return (
        <>
            <div className="w-10/12 mx-auto flex justify-center mt-4">
                <div className="header flex flex-wrap justify-evenly items-center w-full px-4 py-2 bg-white border-b-2 border-[#0000001a] md:justify-between">
                    <div className=" text-3xl font-bold ml-3">
                        <Link to="/">GrowthCode</Link>
                    </div>
                    <div className="second flex space-x-4 mt-2 md:mt-0">
                        <Link className="mx-1 font-semibold" to="/">Home</Link>
                        <Link className="mx-1 font-semibold" to="/product">Product</Link>
                    </div>
                    <div className="third mt-2 md:mt-0">
                        <Search />
                    </div>
                    <div className="fourth flex flex-row mt-2 md:mt-0 items-center">
                        <Link to="/cart">
                            <i className="fa-solid fa-cart-shopping mx-2 text-xl"></i>
                        </Link>
                        <div className="relative ml-3" ref={dropdownRef}>
                            <div>
                                <button
                                    type="button"
                                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    id="user-menu-button"
                                    aria-expanded={isOpen}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={link || p}
                                        alt="profile"
                                    />
                                </button>
                            </div>
                            <div
                                className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${isOpen ? 'block' : 'hidden'}`}
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu-button"
                                tabIndex="-1"
                            >
                                <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0">
                                    {user && (<div>Dashboard</div>)}
                                </Link>
                            {!user &&<Link to="/signUp" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2">
                                Sign Up
                            </Link>}
                                {success ? (
                                    <button onClick={handleLogout}
                                        className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">
                                        Logout
                                    </button>
                                ) : (
                                    <Link to="/signIn" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-1">
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="line"></div>
        </>
    );
}
