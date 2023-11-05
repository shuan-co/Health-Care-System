import { useEffect, useState } from "react";
import pfp from './pfp.jpg'
import sub from './sub.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faUser, faInbox, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const house = <FontAwesomeIcon icon={faHouse} />
const profile = <FontAwesomeIcon icon={faUser} />
const inbox = <FontAwesomeIcon icon={faInbox} />
const logout = <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180}/>

function Sidebar(props) {
    const selected = props.selected;
    const name = props.adminName
    return (
        <nav className="flex flex-col w-64 px-12 pt-4 pb-6 navbar">
            <div className="mt-10">
                <img className="w-10 h-10 block mx-auto mb-3" src={sub}></img>
                <img className="rounded-full w-40 h-40 mb-8" src={pfp}></img>
                <h1 className="mx-auto text-center uppercase text-2xl text-blue-800 font-bold">{props.name}</h1>
            </div>
            <div className="mt-8 space-y-12">
                {selected == "dashboard" ? (
                    <div className="w-52 h-10 bg-indigo-600 bg-opacity-60 rounded-tl-[19px] rounded-bl-[19px] shadow ps-2 pt-1">
                        <button className="text-xl " onClick={() => props.changeSelected("dashboard")}>{house}</button>
                        <button className="text-xl ms-3 exo" onClick={() => props.changeSelected("dashboard")}> Dashboard</button>
                    </div>
                ) : (
                    <div className="w-52 h-10 hover:bg-indigo-300 hover:bg-opacity-60 hover:rounded-tl-[19px] hover:rounded-bl-[19px] ps-2 pt-1">
                        <button className="text-xl" onClick={() => props.changeSelected("dashboard")}>{house}</button>
                        <button className="text-xl ms-3 exo" onClick={() => props.changeSelected("dashboard")}> Dashboard</button>
                    </div>
                ) }
                

                {selected == "profile" ? (
                        <div className="w-52 h-10 bg-indigo-600 bg-opacity-60 rounded-tl-[19px] rounded-bl-[19px] shadow ps-2 pt-1">
                        <button className="text-xl" onClick={() => props.changeSelected("profile")}>{profile} </button>
                        <button className="text-xl ms-4 exo" onClick={() => props.changeSelected("profile")}>Profile</button>
                        </div>
                ) : (
                    <div className="w-52 h-10 hover:bg-indigo-300 hover:bg-opacity-60 hover:rounded-tl-[19px] hover:rounded-bl-[19px] ps-2 pt-1">
                        <button className="text-xl" onClick={() => props.changeSelected("profile")}>{profile}</button>
                        <button className="text-xl ms-4 exo" onClick={() => props.changeSelected("profile")}>Profile</button>
                    </div>
                ) }

                {selected == "inbox" ? (
                        <div className="w-52 h-10 bg-indigo-600 bg-opacity-60 rounded-tl-[19px] rounded-bl-[19px] shadow ps-2 pt-1">
                        <div>
                            <button className="text-xl" onClick={() => props.changeSelected("inbox")}>{inbox}</button>
                            <button className="text-xl ms-3 exo" onClick={() => props.changeSelected("inbox")}>Inbox</button>
                        </div>
                        </div>
                ) : (
                    <div className="w-52 h-10 hover:bg-indigo-300 hover:bg-opacity-60 hover:rounded-tl-[19px] hover:rounded-bl-[19px] ps-2 pt-1">
                        <button className="text-xl" onClick={() => props.changeSelected("inbox")}>{inbox}</button>
                        <button className="text-xl ms-3 exo" onClick={() => props.changeSelected("inbox")}>Inbox</button>
                    </div>
                ) }

                <div className="w-52 h-10 hover:bg-indigo-300 hover:bg-opacity-60 hover:rounded-tl-[19px] hover:rounded-bl-[19px] ps-2 pt-1">
                    <button className="text-xl">{logout}</button>
                    <button className="text-xl ms-3 exo">Log Out</button>
                </div>
            </div>
        </nav>
    )
}

export default Sidebar;