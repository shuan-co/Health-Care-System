import React from 'react'
import { useState } from 'react';
import { db } from '../../../firebase/Firebase'
import { setDoc, doc } from 'firebase/firestore'
import { user } from '../../../firebase/Firebase';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function Pforms(){
    // personal information
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [addressLine, setAddress] = useState("")
    const [sex, setSex] = useState("")
    const [bloodType, setBloodType] = useState("")
    const [emergencyContact, setEmergencyContact] = useState("")
    const [emergencyContactNumber, setEmergencyContactNumber] = useState("")
    const [allergies, setAllergies] = useState([])

    // family history
    const [relativeName, setRelativeName] = useState("")
    const [relationshipWithRelative, setRelationshipWithRelative] = useState("")
    const [relativeCondition, setRelativeCondition] = useState("")
    const [relativeMedications, setRelativeMedications] = useState("")

    // vaccination
    const [vaccineType, setVaccineType] = useState("")
    const [vaccineBrand, setVaccineBrand] = useState("")
    const [vaccinationDate, setVaccinationDate] = useState("")
    const [vaccineRemarks, setVaccineRemarks] = useState("")

    // personal medical history
    const [historyType, setHistoryType] = useState("")
    const [historyDate, setHistoryDate] = useState("")
    const [historyRemarks, setHistoryRemarks] = useState("")

    // get information document of the patient
    const patientInfoDocRef = doc(db, "Testing", 'Patients', user.uid, "information")

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
                await setDoc(patientInfoDocRef, {
                    // personal information
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    addressLine: addressLine,
                    sex: sex, 
                    bloodType: bloodType,
                    emergencyContact: emergencyContact,
                    allergies: allergies,

                    // family history
                    relativeName: relativeName,
                    relationshipWithRelative: relationshipWithRelative,
                    relativeCondition: relativeCondition, 
                    relativeMedications: relativeMedications, 

                    // vaccination
                    vaccineType: vaccineType, 
                    vaccineBrand: vaccineBrand, 
                    vaccinationDate: vaccinationDate, 
                    vaccineRemarks: vaccineRemarks,

                    // personal medical history
                    historyType: historyType,
                    historyDate: historyDate,
                    historyRemarks: historyRemarks
                })
        } catch (error) {
                console.log(error)
        }

    }

    const handleSexChange = (event) => {
        setSex(event.target.value)
    }

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber(0);
        setAddress("");
        setSex("");
        setBloodType("");
        setEmergencyContact("");
        setEmergencyContactNumber("");
        setAllergies("");
        
        setRelativeName("");
        setRelationshipWithRelative("");
        setRelativeCondition("");
        setRelativeMedications("");
        
        setVaccineType("");
        setVaccineBrand("");
        setVaccinationDate("");
        setVaccineRemarks("");
        
        setHistoryType("");
        setHistoryDate("");
        setHistoryRemarks("");
    }

    const handleAllergiesChange = (event) => {
        setAllergies(event.target.value.split(" "))
    }

    return (
        <form className='mx-96 mt-20' name='patientForm'>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="number"
                                    name="number"
                                    type="number"
                                    autoComplete="phone number"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                Street address
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="street-address"
                                id="street-address"
                                autoComplete="street-address"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Sex</legend>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="male"
                                        name="sex"
                                        value="Male"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        onChange={handleSexChange}
                                    />
                                    <label htmlFor="male" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
                                        Male
                                    </label>

                            
                                    <input
                                        id="female"
                                        name="sex"
                                        type="radio"
                                        value="Female"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        onChange={handleSexChange}
                                    />
                                    <label htmlFor="female" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
                                        Female
                                    </label>
                                </div>
                            </fieldset>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="bloodtype" className="block text-sm font-medium leading-6 text-gray-900">
                                Blood Type
                            </label>
                            <div className="mt-2">
                                <select
                                    id="bloodtype"
                                    name="bloodtype"
                                    autoComplete="bloodtype"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setBloodType(e.target.value)}
                                >
                                    <option>A+</option>
                                    <option>B+</option>
                                    <option>AB+</option>
                                    <option>O+</option>
                                    <option>A-</option>
                                    <option>B-</option>
                                    <option>AB-</option>
                                    <option>O-</option>
                                </select>
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="emergencyContactName" className="block text-sm font-medium leading-6 text-gray-900">
                                Emergency Contact Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="emergencyContactName"
                                    id="emergencyContactName"
                                    autoComplete="emergencyContactName"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setEmergencyContact(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="emergencyContactName" className="block text-sm font-medium leading-6 text-gray-900">
                                Emergency Contact Phone Number
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="emergencyContactNumber"
                                    id="emergencyContactNumber"
                                    autoComplete="emergencyContactNumber"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setEmergencyContactNumber(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="allergies" className="block text-sm font-medium leading-6 text-gray-900">
                                Allergies
                            </label>
                            <div className="mt-2">
                                <input
                                type="text"
                                name="allergies"
                                id="allergies"
                                autoComplete="allergies"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                onChange={handleAllergiesChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Family History</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="relativeName" className="block text-sm font-medium leading-6 text-gray-900">
                                Full name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="relativeName"
                                    id="relativeName"
                                    autoComplete="relativeName"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setRelativeName(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="relativeRelationship" className="block text-sm font-medium leading-6 text-gray-900">
                                Relationship
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="relativeRelationship"
                                    id="relativeRelationship"
                                    autoComplete="relativeRelationship"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setRelationshipWithRelative(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="relativeCondition" className="block text-sm font-medium leading-6 text-gray-900">
                                Condition
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="relativeCondition"
                                    id="relativeCondition"
                                    autoComplete="relativeCondition"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setRelativeCondition(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="relativeMedications" className="block text-sm font-medium leading-6 text-gray-900">
                                Medications
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="relativeMedications"
                                    id="relativeMedications"
                                    autoComplete="relativeMedications"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setRelativeMedications(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Vaccination</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="vaccineType" className="block text-sm font-medium leading-6 text-gray-900">
                                Vaccine Type
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="vaccineType"
                                    id="vaccineType"
                                    autoComplete="vaccineType"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 "
                                    onChange={(e) => setVaccineType(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="vaccineBrand" className="block text-sm font-medium leading-6 text-gray-900">
                                Brand
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="vaccineBrand"
                                    id="vaccineBrand"
                                    autoComplete="vaccineBrand"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 "
                                    onChange={(e) => setVaccineBrand(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="vaccinationDate" className="block text-sm font-medium leading-6 text-gray-900">
                                Date Administered
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="vaccinationDate"
                                    id="vaccinationDate"
                                    autoComplete="vaccinationDate"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 "
                                    onChange={(e) => setVaccinationDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-full">
                            <label htmlFor="vaccineRemarks" className="block text-sm font-medium leading-6 text-gray-900">
                                Remarks
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="vaccineRemarks"
                                    id="vaccineRemarks"
                                    autoComplete="vaccineRemarks"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 "
                                    onChange={(e) => setVaccineRemarks(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Medical History</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="historyType" className="block text-sm font-medium leading-6 text-gray-900">
                                Type
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="historyType"
                                    id="historyType"
                                    autoComplete="historyType"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 "
                                    onChange={(e) => setHistoryType(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="historyDate" className="block text-sm font-medium leading-6 text-gray-900">
                                Date
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    name="historyDate"
                                    id="historyDate"
                                    autoComplete="historyDate"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 "
                                    onChange={(e) => setHistoryDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-full">
                            <label htmlFor="historyRemarks" className="block text-sm font-medium leading-6 text-gray-900">
                                Remarks
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="historyRemarks"
                                    id="historyRemarks"
                                    autoComplete="historyRemarkse"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 "
                                    onChange={(e) => setHistoryRemarks(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="reset" className="text-sm font-semibold leading-6 text-gray-900" onClick={clearForm}>
                    Cancel
                </button>
                <button
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={onSubmitForm}
                >
                    Save
                </button>
            </div>
        </form>
    )
}