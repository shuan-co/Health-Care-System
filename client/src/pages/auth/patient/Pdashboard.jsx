import { useNavigate } from 'react-router-dom';

function Pdashboard() {
    const navigate = useNavigate();

    const handleViewMedicalRecordsClick = () => {
        navigate("/test");
    };

    const handleViewPatientForm = () => {
        navigate("/patientform");
    };

    return (
        <>
            <p style={{ fontSize: "30px" }}>Patient Logged In</p>
            <button
                style={{ fontSize: "30px", color: "blue" }}
                onClick={handleViewMedicalRecordsClick}
            >
                View Medical Records
            </button> <br />

            <button
                style={{ fontSize: "30px", color: "blue" }}
                onClick={handleViewPatientForm}
            >
                View Patient Form
            </button>
        </>
    );
}

export default Pdashboard;
