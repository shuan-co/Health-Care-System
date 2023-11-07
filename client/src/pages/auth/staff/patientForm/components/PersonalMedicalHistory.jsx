import React from 'react';
import RequiredAsterisk from './asterisk';

export default function PersonalMedicalHistory(props) {

    return (
        <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-black">Personal Medical History</h2>
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label htmlFor="historyType" className="block text-sm font-medium leading-6 text-black">
                        Type
                        <RequiredAsterisk />
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="historyType"
                            id="historyType"
                            autoComplete="historyType"
                            className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 "
                            value={props.historyType}
                            onChange={(e) => props.getHistoryType(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="historyDate" className="block text-sm font-medium leading-6 text-black">
                        Date
                    </label>
                    <div className="mt-2">
                        <input
                            type="date"
                            name="historyDate"
                            id="historyDate"
                            autoComplete="historyDate"
                            className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3 "
                            value={props.historyDate}
                            onChange={(e) => props.getHistoryDate(e.target.value)}
                        />
                    </div>
                </div>

                <div className="sm:col-span-full">
                    <label htmlFor="historyRemarks" className="block text-sm font-medium leading-6 text-black">
                        Remarks
                    </label>
                    <div className="mt-2">
                        <input
                            type="text"
                            name="historyRemarks"
                            id="historyRemarks"
                            autoComplete="historyRemarks"
                            className="text-black block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                            value={props.historyRemarks}
                            onChange={(e) => props.getHistoryRemarks(e.target.value)}
                            
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
