// Vaccination.jsx

import React from 'react';
import RequiredAsterisk from './asterisk';

export default function Vaccination(props) {
    console.log('Vaccination props:', props);
    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-white">Vaccination</h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="vaccineType" className="block text-sm font-medium leading-6 text-white">
                        Vaccine Type <RequiredAsterisk />
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="vaccineType"
                            id="vaccineType"
                            autoComplete="vaccineType"
                            className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 "
                            required
                            onChange={(e) => props.getVaccineType(e.target.value)}
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="vaccineBrand" className="block text-sm font-medium leading-6 text-white">
                        Brand <RequiredAsterisk />
                    </label> 
                    <div className="mt-2">
                        <input
                            type="text"
                            name="vaccineBrand"
                            id="vaccineBrand"
                            autoComplete="vaccineBrand"
                            className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 "
                            required
                            onChange={(e) => props.getVaccineBrand(e.target.value)}
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="vaccinationDate" className="block text-sm font-medium leading-6 text-white">
                        Date Administered <RequiredAsterisk />
                    </label>
                    <div className="mt-2">
                        <input
                            type="date"
                            name="vaccinationDate"
                            id="vaccinationDate"
                            autoComplete="vaccinationDate"
                            className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 "
                            required
                            onChange={(e) => props.getVaccineDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="sm:col-span-full">
                    <label htmlFor="vaccineRemarks" className="block text-sm font-medium leading-6 text-white">
                        Remarks
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="vaccineRemarks"
                            id="vaccineRemarks"
                            autoComplete="vaccineRemarks"
                            className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 "
                            onChange={(e) => props.getVaccineRemarks(e.target.value)}
                        />
                    </div>
                </div>
                <div className="mt-10">
                <button 
                  type="button"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                  onClick={props.addForm}
                  >
                  Add Vaccine
                </button>

            </div>
            </div>
        </div>
    );
}
