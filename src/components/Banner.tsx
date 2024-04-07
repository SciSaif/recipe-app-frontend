const Banner = () => {
    return (
        <main>
            <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                        <img
                            alt=""
                            src="https://realfood.tesco.com/media/images/472x310-Tesco-DinnerFor2-FridgeRaidFeasts-16024-BaconMushroomBreakfastHash-0e5cf25f-f42c-45a2-b4a3-f4f9f06ee002-0-472x310.jpg"
                            className="absolute inset-0 object-cover w-full h-full"
                        />
                    </div>

                    <div className="lg:py-24">
                        <h2 className="text-3xl font-bold sm:text-4xl">
                            Find any recipe you desire
                        </h2>

                        <p className="mt-4 text-gray-600">
                            Search for recipes by meal type, cuisine,
                            difficulty, and tags. Find the perfect recipe for
                            your next meal.
                        </p>

                        <a
                            href="#recipes"
                            className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                        >
                            Check out some recipes
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Banner;
