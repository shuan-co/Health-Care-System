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
        {
            title: '2. Who can use this app?',
            content: 'This app is designed for medical professionals, such as nurses and doctors, as well as administrative staff and patients within healthcare departments in economic zones.',
        },
        {
            title: '3. How can this app help healthcare professionals work more effectively?',
            content: 'The app automates repetitive tasks and uses predictive models to optimize inventory management, allowing healthcare professionals to focus on patient care rather than clerical tasks.',
        },
        {
            title: '4. What are the key features of the app?',
            content: 'The key features include inventory management, logistics and distribution, and a directory/referral system. These features ensure efficient resource management and timely access to medical supplies and services.',
        },
        {
            title: '5. How do I get started with the app?',
            content: 'Getting started is easy. Login to your account and navigate the website using the navigation bar above.',
        },
        {
            title: '6. Is my data secure within the app?',
            content: 'Yes, we prioritize data security and adhere to industry-standard encryption and security protocols to protect your information.',
        },
        {
            title: '7. Can I track inventory levels in real-time with this app?',
            content: 'Yes, the app provides real-time inventory tracking, ensuring you always have the supplies you need and reducing the risk of stockouts.',
        },
        {
            title: '8. How does the app automate reordering of medical supplies?',
            content: 'The app uses predictive models to automate the reordering process, analyzing usage patterns and setting reorder points to ensure a consistent supply of critical items.',
        },
        {
            title: '9. How does the directory/referral system work?',
            content: 'The app features a comprehensive directory of healthcare professionals and services in the economic zone. You can easily find and refer patients to the right specialists, improving care coordination.',
        },
    ];

    return (
        <div className="w-screen h-max p-10 pb-50">

            <h1 className='text-slate-800 text-4xl mb-10 text-center lato'>Frequently Asked Questions</h1>

            <div className='space-y-8'>
                {questions.map((question, i) => (
                    <div key={i} className={`accordion-item ${openIndex === i ? 'active' : ''}`}>
                        <div
                            className='mx-36 accordion-header text-3xl cursor-pointer bg-slate-50 p-7 flex justify-between items-center rounded-lg shadow-xl drop-shadow-2xl'
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        >
                            {question.title}
                            <FontAwesomeIcon icon={faChevronDown} className={`${openIndex === i ? 'rotate-180' : ''}`} />
                        </div>
                        <div className={`mx-36 accordion-content overflow-hidden duration-200 ease-out ${openIndex === i ? 'h-auto bg-stone-100 p-4' : 'h-0'}`}>
                            <p className='mt-4 text-xl text-slate-800'>{question.content}</p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default QA;
