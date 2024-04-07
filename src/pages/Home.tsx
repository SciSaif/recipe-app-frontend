import React, { Fragment } from "react";
import { useQuery, gql } from "@apollo/client";
import RecipeCard, { Recipe } from "../components/RecipeCard";
import Filters, { Filters as FiltersType } from "../components/filters/Filters";
import Pagination from "../components/Pagination";
import Banner from "@/components/Banner";
import Loader from "@/components/Loader";
// import recipeData from "../components/data";
const GET_RECIPES = gql`
    query Recipes(
        $mealType: [String]
        $cuisine: [String]
        $difficulty: [String]
        $tags: [String]
        $skip: Int
        $limit: Int
    ) {
        recipes(
            mealType: $mealType
            cuisine: $cuisine
            difficulty: $difficulty
            tags: $tags
            skip: $skip
            limit: $limit
        ) {
            recipes {
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
            totalCount
        }
    }
`;

// const BULK_RECIPE_UPLOAD = gql`
//     mutation BulkRecipeUpload($recipes: [RecipeBulk]!) {
//         bulkRecipeUpload(recipes: $recipes) {
//             insertedCount
//         }
//     }
// `;

const Home: React.FC = () => {
    // const [bulkRecipeUpload] = useMutation(BULK_RECIPE_UPLOAD);

    const [filters, setFilters] = React.useState<FiltersType>({
        mealType: [],
        cuisine: [],
        difficulty: [],
        tags: [],
    });
    const [page, setPage] = React.useState(1);

    const { loading, error, data } = useQuery<{
        recipes: { recipes: Recipe[]; totalCount: number };
    }>(GET_RECIPES, {
        variables: {
            mealType: filters.mealType,
            cuisine: filters.cuisine,
            difficulty: filters.difficulty,
            tags: filters.tags,
            skip: (page - 1) * 10,
            limit: 10,
        },
    });
    const recipes = data?.recipes.recipes;
    const totalCount = data?.recipes.totalCount;
    const totalPages = (totalCount && Math.ceil(totalCount / 10)) || 1;

    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="pb-10 ">
            <Banner />
            {/* <div>
                <button
                    onClick={() =>
                        bulkRecipeUpload({
                            variables: {
                                recipes: recipeData,
                            },
                        })
                    }
                >
                    Bulk Upload
                </button> 
            </div> */}
            <div id="recipes" className="px-10 py-10 ">
                <div>
                    <h1 className="pb-2 mb-10 text-2xl font-bold border-b">
                        Recipes
                    </h1>
                </div>

                <Filters filters={filters} setFilters={setFilters} />
                <div
                    className={
                        " grid [grid-auto-rows:1fr] grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 md:gap-8"
                    }
                >
                    {recipes?.map((recipe) => (
                        <Fragment key={recipe._id}>
                            <RecipeCard recipe={recipe} />
                        </Fragment>
                    ))}
                </div>
                {loading && (
                    <div>
                        <Loader size={16} />
                    </div>
                )}
            </div>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </div>
    );
};

export default Home;
