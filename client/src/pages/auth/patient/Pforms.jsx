import React from 'react'
import { useState } from 'react';
import { db } from '../../../firebase/Firebase'
import { setDoc, doc } from 'firebase/firestore'
import { user } from '../../../firebase/Firebase';

export default function Pforms(){
    // clinic
    const [clinic, setClinic] = useState("")

    // patient name
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [suffix, setSuffix] = useState("")

    // birthdate and sex
    const [birthDate, setBirthDate] = useState("")
    const [sex, setSex] = useState("")

    // contact information
    const [addressLine, setAddress] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(0)

    // emergency contact information
    const [emergencyContactName, setEmergencyContactName] = useState("")
    const [emergencyContactNumber, setEmergencyContactNumber] = useState(0)
    const [relationshipToPatient, setRelationshipToPatient] = useState("")

    // insurance information
    const [healthInsuranceProvider, setHealthInsuranceProvider] = useState("")
    const [policyNumber, setPolicyNumber] = useState(0)
    const [groupNumber, setGroupNumber] = useState(0)

    // medical history
    const [prevMedicalConditions, setPrevMedicalConditions] = useState([])
    const [surgeriesAndHospitalizations, setSurgeriesAndHospitalizations] = useState([])
    const [chronicIllnesses, setChronicIllnesses] = useState([])

    // get information document of the patient
    const patientInfoDocRef = doc(db, "Testing", 'Patients', user.uid, "information")

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {
                await setDoc(patientInfoDocRef, {
                    firstName: firstName,
                    middleName: middleName,
                    lastName: lastName,
                    suffix: suffix,

                    birthDate: birthDate,
                    sex: sex,

                    addressLine: addressLine,
                    phoneNumber: phoneNumber,

                    contactPerson: emergencyContactName,
                    contactPhoneNumber: emergencyContactNumber,
                    relationshipToPatient: relationshipToPatient,

                    insuranceProvider: healthInsuranceProvider,
                    insurancePolicyNumber: policyNumber,
                    insuranceGroupNumber: groupNumber,

                    previousMedicalConditions: prevMedicalConditions,
                    surgeriesAndHospitalizations: surgeriesAndHospitalizations,
                    chronicIllnesses: chronicIllnesses

                })
        } catch (error) {
                console.log(error)
        }

    }

    const handleSexChange = (event) => {
            setSex(event.target.value)
    }

    const handleMedicalConditonChange = (event) => {
            setPrevMedicalConditions(event.target.value.split(" "))
    }

    const handleSurgeriesAndHospChange = (event) => {
            setSurgeriesAndHospitalizations(event.target.value.split(" "))
    }

    const handleChronicIllnessesChange = (event) => {
            setChronicIllnesses(event.target.value.split(" "))
    }

    return (
        <form id='patientForm' className='bg-green-50 arvo'>
            <div className='mx-auto w-max h-max mt-10'>
                <h1 className='text-3xl mb-2'>General Information</h1>
                <div className='text-2xl ms-32 grid grid-cols-2 mt-10 gap-x-20 gap-y-10'>
                    <div className='grid grid-cols-3'>
                        <label htmlFor='firstName' className='w-max'>First name:</label>
                        <input id='firstName'
                                type='text'
                                className='bg-gray-300 w-64 col-span-2'
                                onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    
                    <div className='grid grid-cols-3'>
                        <label htmlFor='middleName' className='w-max me-5'>Middle name:</label>
                        <input id='middleName' 
                                type='text'
                                className='bg-gray-300 w-64 col-span-2'
                                onChange={(e) => setMiddleName(e.target.value)}
                        />   
                    </div>
                     
                    <div className='grid grid-cols-3'>
                        <label htmlFor='lastName' className='w-max'>Last name:</label>
                        <input id='lastName' 
                                type='text'
                                className='bg-gray-300 w-64 col-span-2'
                                onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    
                    <div className='grid grid-cols-3'>
                        <label htmlFor='suffix' className='w-max'>Suffix:</label>
                        <input id='suffix' 
                                type='text'
                                className='bg-gray-300 w-64 col-span-2'
                                onChange={(e) => setSuffix(e.target.value)}
                        />         
                    </div>
                </div>
                
                <div className='text-2xl ms-32 mt-10'>
                    <div className=''>
                        <label htmlFor='dateOfBirth' className='me-12'>Date of Birth:</label>
                        <input id='dateOfBirth' 
                                type='date'
                                className='w-36 text-lg bg-gray-300'
                                onChange={(e) => setBirthDate(e.target.value)}
                        />
                    </div>
                    
                    <div className='mt-10'>
                        <p className='inline me-5'>Sex:</p>
                        <input id='male' 
                                name='sex' 
                                type='radio' 
                                value='Male'
                                className='me-4'
                                onChange={handleSexChange}
                        />
                        <label htmlFor='male' className='me-5 text-xl'>Male</label>
                        <input id='female' 
                                name='sex' 
                                type='radio' 
                                value='Female'
                                className='me-4'    
                                onChange={handleSexChange}
                        />
                        <label for='female' className='text-xl'>Female</label>
                    </div>

                    <div className='mt-10'>
                        <label htmlFor='addressLine' className='me-5'>Current Address:</label>
                        <textarea id='addressLine' 
                                rows={1}
                                cols={63}
                                className='bg-gray-300'
                                onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>

                    <div className='mt-10'>
                        <label htmlFor='phoneNumber' className='me-10 mt-10'>Phone number:</label>
                        <input id='phoneNumber'  
                                type='text'
                                className='bg-gray-300'
                                onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </div>                    
                </div>

                <h1 className='text-3xl mt-20'>Emergency Contact Person</h1>
                <div className='text-2xl ms-32 mt-10'>
                    <div>
                        <label htmlFor='contactPersonName' className='me-52'>Name:</label>
                        <input id='contactPersonName' 
                                type='text'
                                className='w-64 bg-gray-300 ms-3'
                                onChange={(e) => setEmergencyContactName(e.target.value)}
                        />
                    </div>
                    
                    <div className='mt-10'>
                        <label htmlFor='contactPhoneNumber' className='me-28'>Phone number:</label>
                        <input id='contactPhoneNumber' 
                                type='number'
                                className='w-64 bg-gray-300'
                                onChange={(e) => setEmergencyContactNumber(e.target.value)}
                        />    
                    </div>
                    
                    <div className='mt-10'>
                        <label htmlFor='relationshipToPatient' className='me-6'>Relationship to Patient:</label>
                        <input id='relationshipToPatient' 
                                type='text'
                                className='w-64 bg-gray-300'
                                onChange={(e) => setRelationshipToPatient(e.target.value)}
                        />
                    </div>
                </div>
                

                <h1 className='text-3xl mt-20'>Insurance Information</h1>
                <div className='text-2xl ms-32 mt-10'>
                    <div className='mt-10'>
                        <label htmlFor='insuranceprovider' className='me-3'>Insurance Provider:</label>
                        <input id='insuranceprovider' 
                                type='text'
                                className='w-64 bg-gray-300'
                                onChange={(e) => setHealthInsuranceProvider(e.target.value)}
                        />
                    </div>
                    
                    <div className='mt-10'>
                        <label htmlFor='policynumber' className='me-14'>Policy Number:</label>
                        <input id='policynumber' 
                                type='number'
                                className='w-64 bg-gray-300 ms-1'
                                onChange={(e) => setPolicyNumber(e.target.value)}
                        />
                    </div>
                   
                    <div className='mt-10'>
                        <label htmlFor='groupnumber' className='me-14'>Group Number:</label>
                        <input id='groupnumber' 
                                type='number'
                                className='w-64 bg-gray-300'
                                onChange={(e) => setGroupNumber(e.target.value)}
                        />
                    </div>
                    
                </div>

                <h1 className='text-3xl mt-10'>Medical History (split by space)</h1>
                <div className='text-2xl mt-10 ms-32'>
                    <div className='mt-10'>
                        <label htmlFor='prevMedicalConditions' className='me-10'>Previous Medical Conditions:</label>
                        <textarea id='prevMedicalConditions' 
                                className='bg-gray-300'
                                rows={1}
                                cols={53}
                                onChange={handleMedicalConditonChange}
                        />
                    </div>
                    
                    <div className='mt-10'>
                        <label htmlFor='surgeriesAndHosp' className='me-5'>Surgeries and Hospitalizations:</label>
                        <textarea id='surgeriesAndHosp' 
                                className='bg-gray-300'
                                rows={1}
                                cols={53}
                                onChange={handleSurgeriesAndHospChange}
                        />
                    </div>
                    
                    <div className='mt-10'>
                        <label htmlFor='chronicIllnesses' className='me-40'>Chronic Illnesses:</label>
                        <textarea id='chronicIllnesses' 
                                className='bg-gray-300 ms-3'
                                rows={1}
                                cols={53}
                                onChange={handleChronicIllnessesChange}
                        />
                    </div>
                </div>

                <div className='flex place-content-end'>
                    <button onClick={onSubmitForm} 
                            className='bg-green-400
                                    rounded-lg 
                                    p-2 
                                    mt-10 
                                    mb-10
                                    '>Submit
                    </button>
                </div>
                
            </div>
        
        </form>
    )
}