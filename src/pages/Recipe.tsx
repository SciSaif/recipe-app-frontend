import Loader from "@/components/Loader";
import { Recipe as RecipeType } from "@/components/RecipeCard";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_RECIPE = gql`
    query Recipe($_id: ID!) {
        recipe(_id: $_id) {
            _id
            name
            ingredients
            instructions
            prepTimeMinutes
            cookTimeMinutes
            servings
            difficulty
            cuisine
            caloriesPerServing
            tags
            userId
            image
            mealType
        }
    }
`;

const Recipe = () => {
    //  get the recipe id from the url
    const { id } = useParams();
    //  fetch the recipe data from the server
    const { loading, error, data } = useQuery<{
        recipe: RecipeType;
    }>(GET_RECIPE, {
        variables: { _id: id },
    });
    const recipe = data?.recipe;

    if (error) return <p>Error: {error.message}</p>;
    if (loading)
        return (
            <div>
                <Loader size={20} fillParent />
            </div>
        );
    return (
        <div className="flex flex-col px-10 py-10 space-y-6">
            <div className="flex space-x-4">
                <img
                    className="w-1/2 h-auto"
                    src={recipe?.image}
                    alt={recipe?.name}
                />
                <div className="w-1/2 space-y-2">
                    <h1 className="text-2xl font-bold">{recipe?.name}</h1>
                    <p className="text-lg">{recipe?.cuisine}</p>
                    <p className="text-lg">{recipe?.mealType}</p>
                    <p className="text-lg">
                        {recipe?.prepTimeMinutes} minutes prep time
                    </p>
                    <p className="text-lg">
                        {recipe?.cookTimeMinutes} minutes cook time
                    </p>
                    <p className="text-lg">{recipe?.servings} servings</p>
                    <p className="text-lg">
                        {recipe?.caloriesPerServing} calories per serving
                    </p>
                </div>
            </div>
            <div className="flex space-x-4">
                <div className="w-1/2 space-y-2">
                    <h2 className="text-xl font-bold">Ingredients</h2>
                    <ul className="list-disc list-inside">
                        {recipe?.ingredients.map((ingredient, index) => (
                            <li key={index} className="text-lg">
                                {ingredient}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-1/2 space-y-2">
                    <h2 className="text-xl font-bold">Instructions</h2>
                    <ol className="list-decimal list-inside">
                        {recipe?.instructions.map((instruction, index) => (
                            <li key={index} className="text-lg">
                                {instruction}
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Recipe;
