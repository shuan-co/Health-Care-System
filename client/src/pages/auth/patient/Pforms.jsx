/*import React from 'react'
import { useState } from 'react';
import { db } from '../../../firebase/Firebase'
import { setDoc, doc } from 'firebase/firestore'
import { user } from '../../../firebase/Firebase';
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

// Form Components
import RequiredAsterisk from './components/asterisk';
import Vaccination from './components/Vaccination';
import PersonalMedicalHistory from './components/PersonalMedicalHistory';
import FamilyHistory from './components/FamilyHistory';

export default function Pforms() {
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
    const [vaccineType, setVaccineType] = useState("");
    const [vaccineBrand, setVaccineBrand] = useState("");
    const [vaccinationDate, setVaccinationDate] = useState("");
    const [vaccineRemarks, setVaccineRemarks] = useState("");

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
                emergencyContactNumber: emergencyContactNumber,
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
            <asterisk />
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                First name <RequiredAsterisk />
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    autoComplete="given-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                Last name <RequiredAsterisk />
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address <RequiredAsterisk />
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="number" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone number <RequiredAsterisk />
                            </label>
                            <div className="mt-2">
                                <input
                                    id="number"
                                    name="number"
                                    type="number"
                                    autoComplete="phone number"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                                Street address <RequiredAsterisk />
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="street-address"
                                    id="street-address"
                                    autoComplete="street-address"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <fieldset>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Sex <RequiredAsterisk /></legend>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="male"
                                        name="sex"
                                        value="Male"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        onChange={handleSexChange}
                                        required
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
                                        required
                                    />
                                    <label htmlFor="female" className="block text-sm font-medium leading-6 text-gray-900 mb-1">
                                        Female
                                    </label>
                                </div>
                            </fieldset>
                        </div>

                        <div className="sm:col-span-6">
                            <label htmlFor="bloodtype" className="block text-sm font-medium leading-6 text-gray-900">
                                Blood Type <RequiredAsterisk />
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
                                Emergency Contact Name <RequiredAsterisk />
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="emergencyContactName"
                                    id="emergencyContactName"
                                    autoComplete="emergencyContactName"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setEmergencyContact(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="emergencyContactName" className="block text-sm font-medium leading-6 text-gray-900">
                                Emergency Contact Phone Number <RequiredAsterisk />
                            </label>
                            <div className="mt-2">
                                <input
                                    type="number"
                                    name="emergencyContactNumber"
                                    id="emergencyContactNumber"
                                    autoComplete="emergencyContactNumber"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                                    onChange={(e) => setEmergencyContactNumber(e.target.value)}
                                    required
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

                {/* Family History *//*}
                <FamilyHistory
                    relativeName={relativeName}
                    setRelativeName={setRelativeName}
                    relationshipWithRelative={relationshipWithRelative}
                    setRelationshipWithRelative={setRelationshipWithRelative}
                    relativeCondition={relativeCondition}
                    setRelativeCondition={setRelativeCondition}
                    relativeMedications={relativeMedications}
                    setRelativeMedications={setRelativeMedications}
                />


                {/* Vaccination *//*}
                <Vaccination
                    vaccineType={vaccineType}
                    setVaccineType={setVaccineType}
                    vaccineBrand={vaccineBrand}
                    setVaccineBrand={setVaccineBrand}
                    vaccinationDate={vaccinationDate}
                    setVaccinationDate={setVaccinationDate}
                    vaccineRemarks={vaccineRemarks}
                    setVaccineRemarks={setVaccineRemarks}
                />

                {/* Personal Medical History *//*}
                <PersonalMedicalHistory
                    historyType={historyType}
                    setHistoryType={setHistoryType}
                    historyDate={historyDate}
                    setHistoryDate={setHistoryDate}
                    historyRemarks={historyRemarks}
                    setHistoryRemarks={setHistoryRemarks}
                />

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
}*/