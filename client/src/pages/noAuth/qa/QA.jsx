import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function QA() {
    const [openIndex, setOpenIndex] = useState(null);

    const questions = [
        {
            title: '1. What is the Healthcare Logistics and Inventory Management App?',
            content: 'The Healthcare Logistics and Inventory Management App is a comprehensive platform designed for medical professionals, staff, and patients in economic zones. It streamlines logistics, inventory management, and offers a directory/referral system, allowing healthcare professionals to work more effectively and efficiently.',
        },
        // Add more questions here...
    ];

    return (
        <div className="w-screen h-max bg-green-50 p-10">
            <h1 className='text-slate-800 text-4xl mb-10 font-bold'>Frequently Asked Questions</h1>

            <div className='space-y-8'>
                {questions.map((question, i) => (
                    <div key={i} className={`accordion-item ${openIndex === i ? 'active' : ''}`}>
                        <div
                            className='accordion-header text-white text-3xl cursor-pointer bg-green-950 p-7 flex justify-between items-center'
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        >
                            {question.title}
                            <FontAwesomeIcon icon={faChevronDown} className={`text-white ${openIndex === i ? 'rotate-180' : ''}`} />
                        </div>
                        <div className={`accordion-content overflow-hidden duration-200 ease-out ${openIndex === i ? 'h-auto bg-gray-100 p-4' : 'h-0'}`}>
                            <p className='mt-4 text-xl text-slate-800'>{question.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QA;
