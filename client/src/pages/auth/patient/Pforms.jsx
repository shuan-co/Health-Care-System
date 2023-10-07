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
              <form id='patientForm' className='bg-green-50'>
                     <h1 className='text-2xl mb-2'>General Information</h1>
                     <div className='mt-2 p-3 space-x-10'>
                            <label htmlFor='firstName'>First name:</label>
                            <input id='firstName'
                                   type='text' 
                                   onChange={(e) => setFirstName(e.target.value)}
                            />

                            <label htmlFor='middleName'>Middle name:</label>
                            <input id='middleName' 
                                   type='text'
                                   onChange={(e) => setMiddleName(e.target.value)}
                            />

                            <label htmlFor='lastName'>Last name:</label>
                            <input id='lastName' 
                                   type='text'
                                   onChange={(e) => setLastName(e.target.value)}
                            />

                            <label htmlFor='suffix'>Suffix:</label>
                            <input id='suffix' 
                                   type='text'
                                   onChange={(e) => setSuffix(e.target.value)}
                            />      
                     </div>
              
                     <div className='p-3 space-x-10'>
                            <label htmlFor='dateOfBirth'>Date of Birth</label>
                            <input id='dateOfBirth' 
                                   type='date'
                                   onChange={(e) => setBirthDate(e.target.value)}
                            />
                     </div>

                     <div className='p-3 space-x-2'>
                            <input id='male' 
                                   name='sex' 
                                   type='radio' 
                                   value='Male'
                                   onChange={handleSexChange}
                            />
                            <label htmlFor='male'>Male</label>
                            <input id='female' 
                                   name='sex' 
                                   type='radio' 
                                   value='Female'
                                   onChange={handleSexChange}
                            />
                            <label for='female'>Female</label>
                     </div>

                     <h1 className='text-2xl mt-10'>Contact Information</h1>
                     <div className='p-3 space-x-10'>
                            <label htmlFor='addressLine'>Current Address</label>
                            <textarea id='addressLine' 
                                      onChange={(e) => setAddress(e.target.value)}
                            />

                            <label htmlFor='phoneNumber'>Phone number</label>
                            <input id='phoneNumber' 
                                   placeholder='Phone number' 
                                   type='text'
                                   onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                     </div>
       

                     <h1 className='text-2xl mt-10'>Emergency Contact Person</h1>
                     <div className='p-3 space-x-10'>
                            <label htmlFor='contactPersonName'>Name:</label>
                            <input id='contactPersonName' 
                                   type='text'
                                   onChange={(e) => setEmergencyContactName(e.target.value)}
                            />

                            <label htmlFor='contactPhoneNumber'>Phone number:</label>
                            <input id='contactPhoneNumber' 
                                   type='number'
                                   onChange={(e) => setEmergencyContactNumber(e.target.value)}
                            />

                            <label htmlFor='relationshipToPatient'>Relationship to Patient:</label>
                            <input id='relationshipToPatient' 
                                   type='text'
                                   onChange={(e) => setRelationshipToPatient(e.target.value)}
                            />
                     </div>
                     

                     <h1 className='text-2xl mt-10'>Insurance Information</h1>
                     <div className='p-3 space-x-10'>
                            <label htmlFor='insuranceprovider'>Insurance Provider:</label>
                            <input id='insuranceprovider' 
                                   type='text'
                                   onChange={(e) => setHealthInsuranceProvider(e.target.value)}
                            />

                            <label htmlFor='policynumber'>Policy Number:</label>
                            <input id='policynumber' 
                                   type='number'
                                   onChange={(e) => setPolicyNumber(e.target.value)}
                            />

                            <label htmlFor='groupnumber'>Group Number:</label>
                            <input id='groupnumber' 
                                   type='number'
                                   onChange={(e) => setGroupNumber(e.target.value)}
                            />
                     </div>

                     <h1 className='text-2xl mt-10'>Medical History (split by space)</h1>
                     <div className='p-3 space-x-10'>
                            <label htmlFor='prevMedicalConditions'>Previous Medical Conditions:</label>
                            <input id='prevMedicalConditions' 
                                   type='text'
                                   onChange={handleMedicalConditonChange}
                            />

                            <label htmlFor='surgeriesAndHosp'>Surgeries and Hospitalizations:</label>
                            <input id='surgeriesAndHosp' 
                                   type='text'
                                   onChange={handleSurgeriesAndHospChange}
                            />

                            <label htmlFor='chronicIllnesses'>Chronic Illnesses:</label>
                            <input id='chronicIllnesses' 
                                   type='text'
                                   onChange={handleChronicIllnessesChange}
                            />
                     </div>

       
                     <button onClick={onSubmitForm} className='bg-green-400 rounded-lg p-2 mt-10 mb-10'>Submit</button>
       </form>
       )
}