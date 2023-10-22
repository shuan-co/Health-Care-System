import { useNavigate } from "react-router-dom";

function StaffDashboard() {
    const navigate = useNavigate();
    return (
        <>
            <p>Staff Dashboard</p>
            <button onClick={() => navigate('./patientlist')}>Create Staff</button>
        </>
    )
}

export default StaffDashboard;