import './information.css'

function Information() {
    return (
        <div className="xl:w-7/12 xl:h-2/4 sm:left-0 sm:w-auto sm:h-auto rounded-2xl bg-green-950 p-9 fixed bottom-16 md:left-16">
            <p className="text-neutral-100 text-4xl lato">Contact us</p>
            <p className='sans-serif text-neutral-100 text-xl mt-4'>Health Center System</p>
            <p className='sans-serif text-neutral-100 text-xl mt-2'>contact@example.com</p>
            <p className='sans-serif text-neutral-100 text-xl mt-2'>Call us at: +1 (123) 456-7890.</p>
            <p className='sans-serif text-neutral-100 text-xl mt-2'>Visit us at: 123 Main Street, City, State, ZIP Code</p>
            <p className='sans-serif text-neutral-100 text-xl mt-6 font-bold'>Send us a message!</p>
            <form id='contactUs' method='' className='relative'>
                <textarea className='w-full rounded-xl mt-3 bg-green-50 border-0 p-3'></textarea>
                <button type='submit' className='w-24 h-10 font-bold relative rounded-2xl bg-green-300 hover:bg-green-500 mt-2'>Submit</button>
            </form>
        </div>
    );
}
export default Information;