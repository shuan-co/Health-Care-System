import React, { useState } from 'react';
import ClinicTest from './ClinicTest';

function Cdashboard() {
    const [clinicName, setClinicName] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <>
            <p>Clinic Logged In</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Clinic Name:
                    <input type="text" value={clinicName} onChange={(e) => setClinicName(e.target.value)} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            {clinicName && <ClinicTest clinicName={clinicName} />}
        </>
    );
}

export default Cdashboard;