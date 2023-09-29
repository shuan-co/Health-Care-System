import './information.css'

function Information() {
    return (
        <div className='w-screen h-screen bg-green-50'>
            <p className='text-slate-800 text-4xl mt-10 ms-16'>Information</p>
            <div className="xl:w-7/12 xl:h-1/4 sm:left-0 sm:w-auto sm:h-auto rounded-2xl bg-green-950 p-4 lg:p-7 md:p-5 sm:p-4 mx-4 relative top-2/4 md:left-16">
                <p className='sans-serif text-neutral-100 lg:text-2xl text-xl mt-1 font-bold'>Send us a message!</p>
                <form id='contactUs' method='' className='relative'>
                    <textarea className='w-full lg:h-20 md:h-28 h-48 rounded-xl mt-3 bg-green-50 border-0 p-3'></textarea>
                    <button type='submit' className='w-24 h-10 font-bold relative rounded-2xl bg-green-300 hover:bg-green-500 mt-2'>Submit</button>
                </form>
            </div>
        </div>
    );
}
export default Information;