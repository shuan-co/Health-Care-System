import { useNavigate } from 'react-router-dom';

function Pdashboard() {
    const navigate = useNavigate();

    const handleViewMedicalRecordsClick = () => {
        navigate("/test");
    };

    return (
        <>
            <p style={{ fontSize: "30px" }}>Patient Logged In</p>
            <button
                style={{ fontSize: "30px", color: "blue" }}
                onClick={handleViewMedicalRecordsClick}
            >
                View Medical Records
            </button>
        </>
    );
}

export default Pdashboard;
