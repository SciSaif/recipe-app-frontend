import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="flex justify-between px-10 py-3 text-2xl text-white bg-orange-500 border-b shadow">
            <div>Recipe App</div>
            <div className="flex flex-row items-center gap-6">
                <Link to={"/"} className="mr-2 text-sm">
                    Home
                </Link>
                <Link to={"/add-recipe"} className="mr-2 text-sm">
                    Add Recipe
                </Link>
            </div>
        </div>
    );
};

export default Header;
