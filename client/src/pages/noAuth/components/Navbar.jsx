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
        <div className='navbar relative top-0 left-0 right-0 bg-green-950 text-neutral-100 flex justify-between p-7'>
            <Link to={'/'} className='ms-8'>
                <h1 className='text-4xl arvo hover:text-green-300'>Health Center System</h1>
            </Link>
            <nav className='mt-2 flex justify-between text-2xl'>
              <div className='mx-10'>
                <Link to={'/aboutus'} className='lato'>
                  <p className='text-neutral-100 hover:text-green-300'>Information</p>
                </Link>
              </div>

              <div className='mx-10 me-14'>
                <Link to={'/questions'} className='lato'>
                  <p className='text-neutral-100 hover:text-green-300'>FAQs</p>
                </Link>
              </div>
                |
              <div className='mx-7 ms-14 me-14'>
                {isLoggedIn ? (
                  <button onClick={handleLogout} className='lato text-neutral-100 hover:text-green-300'>
                    Logout
                 </button>
               ) : (
                 <Link to={'/login'} className='lato'>
                   <p className='text-neutral-100 hover:text-green-300'>Login</p>
                 </Link>
               )}
              </div>

            </nav>
        </div>
    </header>
  )
}