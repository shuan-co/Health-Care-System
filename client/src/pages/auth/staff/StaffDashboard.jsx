import { useNavigate } from "react-router-dom";

function StaffDashboard() {
    const navigate = useNavigate();
    return (
        <>
            <p>Staff Dashboard</p>
            <button onClick={() => navigate('./patientlist')}>Create Patient</button>
        </>
    )
}

export default StaffDashboard;