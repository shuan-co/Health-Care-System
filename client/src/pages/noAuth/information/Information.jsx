import './information.css'

function Information() {
    return (
        <div className='w-screen h-max bg-green-50'>
            <h1 className='text-slate-800 text-4xl mt-10 ms-16 font-bold'>Healthcare Logistics and Inventory Management App</h1>
            <p className='ms-16 mt-10 text-xl me-16 text-slate-800'>Welcome to the Healthcare Logistics and Inventory Management App, a revolutionary solution designed to empower 
                medical professionals, staff, and patients while enhancing the efficiency and effectiveness of healthcare departments 
                in economic zones.</p>
            
            <h3 className='text-slate-800 text-3xl mt-10 ms-16 font-medium'>Introduction</h3>
            <p className='ms-24 mt-5 text-xl me-16 text-slate-800'>The Healthcare Logistics and Inventory Management App is a cutting-edge platform tailored for healthcare professionals, staff, and patients in economic zones. 
                Our mission is to streamline operations, optimize resource management, and enhance the quality of care by leveraging automation and predictive models. 
                This app is a one-stop solution for healthcare professionals and patients alike, bridging the gap between administrative tasks and delivering top-notch medical services.</p>

            <h3 className='text-slate-800 text-3xl mt-10 ms-16 font-medium'>Key Features</h3>
            <h4 className='text-slate-800 text-2xl mt-10 ms-16 italic'>Inventory Management</h4>
            <p className='ms-24 mt-5 text-xl me-16 text-slate-800'>Real-time Inventory Tracking: Gain full visibility into your medical inventory. Monitor stock levels, expiration dates, and reorder points in real-time, 
            ensuring you never run out of critical supplies.Automated Reordering: The app uses predictive models to automate the reordering process, reducing the risk of stockouts and overstocking.</p>
        
            <h4 className='text-slate-800 text-2xl mt-10 ms-16 italic'>Logistics and Distribution</h4>
            <p className='ms-24 mt-5 text-xl me-16 text-slate-800'>Efficient Distribution: Simplify the distribution of medical supplies across different departments within the economic zone, ensuring timely access to critical resources. 
                Route Optimization: Smart routing algorithms help you minimize transportation costs while ensuring on-time delivery.</p>


            <h4 className='text-slate-800 text-2xl mt-10 ms-16 italic'>Directory and Referral System</h4>
            <p className='ms-24 mt-5 text-xl me-16 text-slate-800'>Comprehensive Directory: Access a vast directory of healthcare professionals, facilities, and services within the economic zone, making it easy to find and refer patients to the right specialists. Referral Tracking: Easily track patient referrals and improve care coordination between healthcare providers.</p>
            
            <h3 className='text-slate-800 text-3xl mt-10 ms-16 font-medium'>How it Works</h3>    
            <p className='ms-24 mt-5 text-xl me-16 text-slate-800'>The app employs user-friendly interfaces for both healthcare professionals and patients, enabling efficient navigation and seamless interaction. By integrating data from various healthcare departments, the app offers insights into inventory levels, logistics, and the directory/referral system.</p>

            <h3 className='text-slate-800 text-3xl mt-10 ms-16 font-medium'>Getting Started</h3>
            <p className='ms-24 mt-5 text-xl me-16 text-slate-800'>Getting started with the Healthcare Logistics and Inventory Management App is easy. Simply 
            login into your account and navigate the app using the navigation bar above for your intended use of the app. For example, you intend to record 
            a medical data of a patient as a clinic staff, simply login to your account and navigate to view forms page.</p>

            <h3 className='text-slate-800 text-3xl mt-10 ms-16 font-medium'>Contact and Support</h3>
            <p className='ms-24 mt-5 text-xl me-16 text-slate-800'>For any inquiries, technical support, or feedback, please send us a message below. 
            We are here to ensure you have a smooth and successful experience with our app. Thank you for choosing the Healthcare Logistics and Inventory Management App. We look forward to enhancing 
            your healthcare operations and improving patient care in economic zones.</p>

            <div className="mt-10 mb-10 xl:w-7/12 xl:h-1/4 sm:left-0 sm:w-auto sm:h-auto rounded-2xl bg-green-950 p-4 lg:p-7 md:p-5 sm:p-4 mx-4 relative top-2/4 md:left-16">
                <p className='sans-serif text-neutral-100 lg:text-2xl text-xl mt-1 font-medium'>Send us a message!</p>
                <form id='contactUs' method='' className='relative'>
                    <textarea className='w-full lg:h-20 md:h-28 h-48 rounded-xl mt-3 bg-green-50 border-0 p-3'></textarea>
                    <button type='submit' className='w-24 h-10 font-medium relative rounded-2xl bg-green-300 hover:bg-green-500 mt-2'>Submit</button>
                </form>
            </div>
        </div>
    );
}
export default Information;