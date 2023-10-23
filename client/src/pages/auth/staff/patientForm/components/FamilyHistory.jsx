import React from 'react';
import RequiredAsterisk from './asterisk';

export default function FamilyHistory(props) {
    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Family History</h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="relativeName" className="block text-sm font-medium leading-6 text-gray-900">
                        Full name <RequiredAsterisk />
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="relativeName"
                            id="relativeName"
                            autoComplete="relativeName"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            onChange={(e) => props.getRelativeFullName(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="relativeRelationship" className="block text-sm font-medium leading-6 text-gray-900">
                        Relationship <RequiredAsterisk />
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="relativeRelationship"
                            id="relativeRelationship"
                            autoComplete="relativeRelationship"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            onChange={(e) => props.getRelationshipWithRelative(e.target.value)}
                            required
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
                            onChange={(e) => props.getRelativeCondition(e.target.value)}
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
                            onChange={(e) => props.getRelativeMedications(e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
