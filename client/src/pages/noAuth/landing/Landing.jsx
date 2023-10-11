import pic from "./sub.jpg"
import CarouselDefault from "./CarouselDefault"

function Landing() {
    return (
        <div>
            <div class="flex justify-center items-center m-20">
                <img class="w-1/4 rounded-lg mr-5 mt-20 mb-28" src={pic}/>
                <div>
                    <h1 class="text-5xl arvo p-4" >Health Center System</h1>
                    <CarouselDefault />
                </div>
            </div>
        </div>
    );
}

export default Landing;