import React from 'react';
import landPage1 from "./landPage1.jpg";
import landPage2 from "./landPage2.jpg";
import { useNavigate } from 'react-router-dom';


function Landing() {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate('/login')
  }
  return (
    <div>
      <div className="border-b border-black">
        <div className="flex items-center m-20">
          <div className="w-1/2 justify-start">
            <p className="text-5xl arvo mb-2">Healthcare Management and Logistics</p>
            <p className="text-xl arvo">lorem ipsum</p>
          </div>
          <div className="justify-end w-1/3 h-3/4">
            <form id="shadow" action="" className="bg-slate-50 h-max
                                                    w-full rounded-lg p-10 mx-auto bg-purple-300 ">
            <p className="exo font-bold text-2xl mb-4 text-center">Sign In Now!</p>
            <button onClick={navigateLogin}
                  className="rounded-full bg-white w-full text-xl
                  h-10 font-bold lato hover:bg-gray-300/75 transition-opacity">Log In </button>
            </form>
          </div>
        </div>
      </div>
      <div className="border-b border-black">
        <div className="flex items-center m-20 justify-end">
          <div className="w-1/4">
            <p className="text-5xl arvo mb-5 text-end">Made for clinics.</p>
            <p className="text-xl arvo text-end">Elevate your clinic's efficiency and patient care with our
                                          system. Streamline schedule, tracking, simplify appointment scheduling,
                                          and enchance patient management</p>
          </div>
        </div>
      </div>
      <div className="border-b border-black">
        <div className="flex items-center m-20 justify-start">
          <div className="w-1/4">
            <p className="text-5xl arvo mb-5 text-start">Made for patients.</p>
            <p className="text-xl arvo text-start">Experience healthcare designed for you. We provide you with easy
                                                    access to your mideical records, appointments, and communications. 
                                                    Your wellness is our priority</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
