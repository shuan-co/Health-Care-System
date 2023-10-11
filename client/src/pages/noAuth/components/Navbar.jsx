import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../../AuthContext';
import { signOut } from "firebase/auth";
import { config } from '../../../firebase/Firebase';
import './navbar.css'

export default function Navbar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(config.auth)
      .then(() => {
        setIsLoggedIn(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <header>
      <div className='w-screen navbar relative top-0 left-0 right-0 bg-green-950 text-neutral-100 flex justify-between p-7'>
        <Link to={'/'} className='ms-8'>
          <h1 className='xl:text-4xl lg:text-3xl md:text-2xl sm:text-xl arvo hover:text-green-300 sm:text-center'>Health Center System</h1>
        </Link>
        <nav className='lg:mt-2 sm:mt-0 md:flex justify-between'>
          <div className='mx-10'>
            <Link to={'/aboutus'} className='lato'>
              <p className='text-neutral-100 hover:text-green-300 xl:text-2xl lg:text-xl md:text-lg sm:text-base'>Information</p>
            </Link>
          </div>

          <div className='mx-10 me-14'>
            <Link to={'/questions'} className='lato'>
              <p className='text-neutral-100 hover:text-green-300 xl:text-2xl lg:text-xl md:text-lg sm:text-base'>FAQs</p>
            </Link>
          </div>

          <div className='mx-7 md:ms-14 ms-10 me-14'>
            {isLoggedIn ? (
              <button onClick={handleLogout} className='lato text-neutral-100 hover:text-green-300 xl:text-2xl lg:text-xl md:text-lg sm:text-base'>
                Logout
              </button>
            ) : (
              <Link to={'/login'} className='lato'>
                <p className='text-neutral-100 hover:text-green-300 xl:text-2xl lg:text-xl md:text-lg sm:text-base'>Login</p>
              </Link>
            )}
          </div>

        </nav>
      </div>
    </header>
  )
}