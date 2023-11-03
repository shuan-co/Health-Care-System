import { useNavigate } from "react-router-dom";
import './ClinicAdminDashboard.css'
import { user } from '../../../firebase/Firebase'
import { doc, getDoc } from "firebase/firestore"; 
import { db } from "../../../firebase/Firebase";
import { useEffect, useState } from "react";
import pfp from './pfp.jpg'
import sub from './sub.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faInbox, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'


const house = <FontAwesomeIcon icon={faHouse} />
const profile = <FontAwesomeIcon icon={faUser} />
const inbox = <FontAwesomeIcon icon={faInbox} />
const logout = <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180}/>

function ClinicAdminDashboard() {
    const [adminName, setAdminName] = useState("")
    const [clinicName, setClinicName] = useState("")
    const [selected, setSelected] = useState("")

    useEffect(() => {
        try {
          async function getClinicName() {
            if (user.uid) {
              const docRef = doc(db, "clinicAdmins", user.uid);
              const docSnap = await getDoc(docRef);
      
              if (docSnap.exists()) {
                setClinicName(docSnap.data().clinicName);
                console.log(clinicName);
              } else {
                console.log("No such document!");
              }
            }
          }
          getClinicName();
        } catch (error) {
          console.log(error);
        }
      
        try {
          async function getAdminName() {
            if (clinicName) {
              const docRef = doc(db, clinicName, "admin");
              const docSnap = await getDoc(docRef);
      
              if (docSnap.exists()) {
                setAdminName(docSnap.data().firstname + " " + docSnap.data().lastname);
                console.log(adminName);
              } else {
                console.log("No such document!");
              }
            }
          }
      
          getAdminName();
          setSelected("dashboard")
        } catch (error) {
          console.log(error);
        }
      }, [user.uid, clinicName]);
      

    const navigate = useNavigate();
    return (
        <div className="h-screen w-full flex overflow-hidden bg-white">
            <nav className="flex flex-col w-64 px-12 pt-4 pb-6 navbar">
                <div className="mt-10">
                    <img className="w-10 h-10 block mx-auto mb-3" src={sub}></img>
                    <img className="rounded-full w-40 h-40 mb-8" src={pfp}></img>
                    <h1 className="mx-auto text-center uppercase text-2xl text-blue-800 font-bold">{adminName}</h1>
                </div>
                <div className="mt-12 space-y-12">
                    {selected == "dashboard" ? (
                        <div className="w-52 h-10 bg-indigo-600 bg-opacity-60 rounded-tl-[19px] rounded-bl-[19px] shadow ps-2 pt-1">
                            <button className="text-xl " onClick={() => setSelected("dashboard")}>{house}</button>
                            <button className="text-xl ms-3 exo" onClick={() => setSelected("dashboard")}> Dashboard</button>
                        </div>
                    ) : (
                        <div className="w-52 h-10 hover:bg-indigo-300 hover:bg-opacity-60 hover:rounded-tl-[19px] hover:rounded-bl-[19px] ps-2 pt-1">
                            <button className="text-xl" onClick={() => setSelected("dashboard")}>{house}</button>
                            <button className="text-xl ms-3 exo" onClick={() => setSelected("dashboard")}> Dashboard</button>
                        </div>
                    ) }
                    

                    {selected == "profile" ? (
                         <div className="w-52 h-10 bg-indigo-600 bg-opacity-60 rounded-tl-[19px] rounded-bl-[19px] shadow ps-2 pt-1">
                            <button className="text-xl" onClick={() => setSelected("profile")}>{profile} </button>
                            <button className="text-xl ms-4 exo" onClick={() => setSelected("profile")}>Profile</button>
                         </div>
                    ) : (
                        <div className="w-52 h-10 hover:bg-indigo-300 hover:bg-opacity-60 hover:rounded-tl-[19px] hover:rounded-bl-[19px] ps-2 pt-1">
                            <button className="text-xl" onClick={() => setSelected("profile")}>{profile}</button>
                            <button className="text-xl ms-4 exo" onClick={() => setSelected("profile")}>Profile</button>
                        </div>
                    ) }

                    {selected == "inbox" ? (
                         <div className="w-52 h-10 bg-indigo-600 bg-opacity-60 rounded-tl-[19px] rounded-bl-[19px] shadow ps-2 pt-1">
                            <div>
                                <button className="text-xl" onClick={() => setSelected("inbox")}>{inbox}</button>
                                <button className="text-xl ms-3 exo" onClick={() => setSelected("inbox")}>Inbox</button>
                            </div>
                         </div>
                    ) : (
                        <div className="w-52 h-10 hover:bg-indigo-300 hover:bg-opacity-60 hover:rounded-tl-[19px] hover:rounded-bl-[19px] ps-2 pt-1">
                            <button className="text-xl" onClick={() => setSelected("inbox")}>{inbox}</button>
                            <button className="text-xl ms-3 exo" onClick={() => setSelected("inbox")}>Inbox</button>
                        </div>
                    ) }

                    <div className="w-52 h-10 hover:bg-indigo-300 hover:bg-opacity-60 hover:rounded-tl-[19px] hover:rounded-bl-[19px] ps-2 pt-1">
                        <button className="text-xl">{logout}</button>
                        <button className="text-xl ms-3 exo">Log Out</button>
                    </div>
                </div>
                    
                
                
            </nav>
            {selected == "dashboard" ? (
                <div className="p-20 border-2 w-10/12">
                    <h1 className="text-4xl exo">Welcome Back, {adminName}</h1>
                    <div className="flex space-x-10 mx-auto mt-10">
                        <button className="w-10/12 h-96 shadow-2xl drop-shadow-2xl text-4xl exo hover:border-2 hover:border-black"
                                onClick={() => navigate('./stafflist')}>Staff List</button>
                        <button className="w-10/12 h-96 shadow-2xl drop-shadow-2xl text-4xl exo hover:border-2 hover:border-black"
                                >Create New Staff</button>
                    </div>
                </div>
            ) : ( 
                <></>
            )}
            
            {selected == "profile" ? (
                <div className="p-20 border-2 w-10/12">
                    <h1 className="text-4xl exo">Profile</h1>
                </div>
            ) : (
                <></>
            )}

            {selected == "inbox" ? (
                <div className="p-20 border-2 w-10/12">
                    <h1 className="text-4xl exo">Inbox</h1>
                </div>
            ) : (
                <></>
            )}

        </div>
    )
}

export default ClinicAdminDashboard;
