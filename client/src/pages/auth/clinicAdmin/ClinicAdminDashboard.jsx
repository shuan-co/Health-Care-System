import StaffList from "./staffForm/StaffList";
import { useNavigate } from "react-router-dom";

function ClinicAdminDashboard() {
    const navigate = useNavigate();
    return (
        <>
            <p>Clinic Admin Dashboard</p>
            <button onClick={() => navigate('./stafflist')}>Create Staff</button>
        </>
    )
}

export default ClinicAdminDashboard;
