// Vaccination.jsx

import React from 'react';
import RequiredAsterisk from './asterisk';

export default function Vaccination(props) {
    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Vaccination</h2>
            <div>
                <label htmlFor="vaccineType" className="block text-sm font-medium leading-6 text-gray-900">
                    Vaccine Type <RequiredAsterisk />
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="vaccineType"
                        id="vaccineType"
                        autoComplete="vaccineType"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                        value={props.vaccineType}
                        onChange={(e) => props.setVaccineType(e.target.value)}
                    />
                </div>

                <label htmlFor="vaccineBrand" className="block text-sm font-medium leading-6 text-gray-900">
                    Vaccine Brand <RequiredAsterisk />
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="vaccineBrand"
                        id="vaccineBrand"
                        autoComplete="vaccineBrand"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                        value={props.vaccineBrand}
                        onChange={(e) => props.setVaccineBrand(e.target.value)}
                    />
                </div>

                <label htmlFor="vaccinationDate" className="block text-sm font-medium leading-6 text-gray-900">
                    Vaccination Date <RequiredAsterisk />
                </label>
                <div className="mt-2">
                    <input
                        type="date"
                        name="vaccinationDate"
                        id="vaccinationDate"
                        autoComplete="vaccinationDate"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                        value={props.vaccinationDate}
                        onChange={(e) => props.setVaccinationDate(e.target.value)}
                    />
                </div>

                <label htmlFor="vaccineRemarks" className="block text-sm font-medium leading-6 text-gray-900">
                    Vaccine Remarks
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="vaccineRemarks"
                        id="vaccineRemarks"
                        autoComplete="vaccineRemarks"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                        value={props.vaccineRemarks}
                        onChange={(e) => props.setVaccineRemarks(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
