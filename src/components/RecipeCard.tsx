import React from "react";

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx";

import { useNavigate } from "react-router-dom";

import { Button } from "./ui/button";
import { limitCharacters } from "@/lib/utils";

export interface Recipe {
    _id: string;
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    userId: number;
    image: string;
    mealType: string[];
}

interface Props {
    recipe: Recipe;
}

const RecipeCard: React.FC<Props> = ({ recipe }) => {
    const navigate = useNavigate();

    return (
        <Card
            className={`relative p-0  overflow-hidden group sm:min-h-[400px]  w-full text-primary rounded-lg flex flex-col  shadow-md hover:shadow-xl  transition duration-300 ease-in-out hover:cursor-pointer`}
            onClick={() => {
                navigate(`/recipes/${recipe._id}`);
            }}
        >
            <div className="flex flex-col items-start delay-75 sm:block group-hover:h-full ">
                <div
                    className={
                        "p-1 w-full  min-w-[7rem] delay-75 transition min-h-20  sm:group-hover:h-full sm:w-full pb-0 rounded-lg overflow-hidden"
                    }
                >
                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className={
                            "rounded-lg w-full max-h-20 min-h-20  sm:group-hover:h-full delay-75 transition-all duration-400  flex-grow sm:max-h-full aspect-square sm:aspect-video  object-cover"
                        }
                    />
                </div>
            </div>
            <div className="absolute top-0 left-0 items-center justify-center hidden w-full h-full transition ease-in delay-75 opacity-0 sm:flex duration-400 group-hover:opacity-100 bg-slate-100/40">
                <Button className="px-10 font-bold bg-black opacity-80 ">
                    View Details
                </Button>
            </div>
            <div className="flex flex-col flex-grow h-full transition-all duration-500 delay-75 group-hover:h-0 ">
                <CardHeader className="p-0 pt-2 pr-2 space-y-0 sm:p-2 sm:pb-2">
                    <CardTitle className="px-2 mb-1">
                        <div
                            className={
                                "flex flex-col text-xs sm:text-base sm:flex-row"
                            }
                        >
                            <h1
                                className={
                                    "leading-4 break-all sm:break-normal capitalize rtl:text-right ltr:text-left text-sm sm:text-base md:text-xl font-normal"
                                }
                            >
                                {limitCharacters(recipe.name, 40)}
                            </h1>
                        </div>
                    </CardTitle>
                    <p
                        className={
                            "text-[10px] px-2 sm:mt-2 sm:text-xs text-primary "
                        }
                    >
                        {recipe.difficulty}
                    </p>
                </CardHeader>

                <CardFooter className="p-0 px-2 mt-1 mb-2 sm:pt-0 sm:px-4">
                    <p
                        className={
                            "text-xs  sm:text-sm leading-3 sm:leading-5 break-all sm:text-md text-primary "
                        }
                    >
                        Meal Type: {recipe.mealType.join(", ")}
                        <br />
                        Cuisine: {recipe.cuisine}
                        <br />
                        Servings: {recipe.servings}
                        <br />
                        Calories: {recipe.caloriesPerServing}
                        <br />
                    </p>
                </CardFooter>

                <CardContent className="p-2 py-0 mt-auto sm:p-4">
                    <div className={"flex flex-row flex-wrap gap-1 sm:gap-2"}>
                        <div>
                            <span
                                className={
                                    "bg-slate-100 px-1 text-xs sm:px-3 py-1 text-primary rounded capitalize "
                                }
                            >
                                {recipe.cuisine}
                            </span>
                        </div>

                        <div>
                            <span
                                className={
                                    "bg-slate-100 px-1 text-xs sm:px-3 text-primary py-1 rounded capitalize "
                                }
                            >
                                {recipe.cookTimeMinutes} min
                            </span>
                        </div>
                    </div>
                </CardContent>
            </div>
        </Card>
    );
};

export default RecipeCard;
