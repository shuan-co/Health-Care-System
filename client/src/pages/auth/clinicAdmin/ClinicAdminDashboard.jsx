import { useNavigate } from "react-router-dom";
import './ClinicAdminDashboard.css'
import { user, db, config } from '../../../firebase/Firebase'
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";


function ClinicAdminDashboard() {
  const [adminName, setAdminName] = useState("")
  const [clinicName, setClinicName] = useState("")
  const [selected, setSelected] = useState("dashboard")

  function changeSelected(selected) {
    setSelected(selected)
  }

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

    useEffect(() => {
      try {
        async function getClinicName() {
          const unsubscribe = onAuthStateChanged(config.auth, async (user) => {
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
          })
        }
      }
      
        try {

        async function getAdminName() {
          const unsubscribe = onAuthStateChanged(config.auth, async (user) => {
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
          })
        }

        getAdminName();
      } catch (error) {
        console.log(error);
      }
    }, [user.uid, clinicName]);


    getAdminName();
  } catch (error) {
    console.log(error);
  }
}, [user.uid, clinicName]);


const navigate = useNavigate();
return (
  <div className="h-screen w-full flex overflow-hidden bg-white">
    <Sidebar selected={selected} name={adminName} changeSelected={changeSelected} />
    {selected == "dashboard" ? (
      <div style={{ float: "left", width: "100vh", height: "100vh", marginLeft: "5vw", marginTop: "13vh" }}>
        <h1 className="text-4xl exo">Welcome Back, {adminName}</h1>
        <div className="mt-10" style={{ width: "70vw", height: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div onClick={() => navigate('./stafflist')} className='Pdashboard-Card-BoxShadow' style={{ border: "2px solid #00008B", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div style={{ border: "2px solid #00008B", background: "linear-gradient(to bottom, #F6FFF0, #87CEEB)", width: "60%", height: "50%", borderRadius: "10px" }}>

            </div>
            <br />
            <span className="ml-3 text-blue-900 text-2xl text-center font-semibold">View Staff<br />List</span>
          </div>

          <div className='Pdashboard-Card-BoxShadow' style={{ border: "2px solid #00008B", backgroundColor: "#FBF7F4", width: "35%", height: "100%", borderRadius: "20px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginLeft: "8vh" }}>
            <div style={{ border: "2px solid #00008B", background: "linear-gradient(to bottom, #F6FFF0, #87CEEB)", width: "60%", height: "50%", borderRadius: "10px" }}>

            </div>
            <br />
            <span className="ml-3 text-blue-900 text-2xl text-center font-semibold">Add New <br />Staff</span>
          </div>
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
