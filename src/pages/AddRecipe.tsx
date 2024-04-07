import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { z } from "zod";
import { Button } from "@/components/ui/button";

import MultiSelect from "@/components/inputs/MultiSelect";
import InputField from "@/components/inputs/InputField";
import SelectField from "@/components/inputs/SelectField";
import { Fragment } from "react/jsx-runtime";
import uploadImage from "@/lib/s3";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { InfoIcon, UploadIcon } from "lucide-react";
import { limitCharacters } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
    CUISINE_OPTIONS,
    DIFFICULTY_OPTIONS,
    MEAL_TYPE_OPTIONS,
    TAGS_OPTIONS,
} from "@/lib/options";

const CREATE_RECIIPE = gql`
    mutation CreateRecipe(
        $name: String!
        $ingredients: [String]!
        $instructions: [String]!
        $prepTimeMinutes: Int!
        $cookTimeMinutes: Int!
        $servings: Int!
        $difficulty: String!
        $cuisine: String!
        $caloriesPerServing: Int!
        $tags: [String]!
        $userId: Int!
        $image: String!
        $rating: Float!
        $reviewCount: Int!
        $mealType: [String]!
        $password: String!
    ) {
        createRecipe(
            name: $name
            ingredients: $ingredients
            instructions: $instructions
            prepTimeMinutes: $prepTimeMinutes
            cookTimeMinutes: $cookTimeMinutes
            servings: $servings
            difficulty: $difficulty
            cuisine: $cuisine
            caloriesPerServing: $caloriesPerServing
            tags: $tags
            userId: $userId
            image: $image
            rating: $rating
            reviewCount: $reviewCount
            mealType: $mealType
            password: $password
        ) {
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
            rating
            reviewCount
            mealType
        }
    }
`;

const formSchema = z.object({
    name: z.string().min(3).max(50),
    ingredients: z.array(z.string().min(1)).min(1),
    instructions: z.array(z.string().min(1)).min(1),
    prepTimeMinutes: z.number().min(1),
    cookTimeMinutes: z.number().min(1),
    servings: z.number().min(1),
    difficulty: z.string().min(3).max(20),
    cuisine: z.string().min(3).max(20),
    caloriesPerServing: z.number().min(1),
    tags: z.array(z.string()).min(1),
    image: z.string().url(),
    mealType: z.array(z.string()).min(1),
    password: z.string().min(1).max(100),
});
export type FormData = z.infer<typeof formSchema>;

const AddRecipe = () => {
    const [image, setImage] = useState<File | null>(null);
    const [createRecipe] = useMutation(CREATE_RECIIPE);
    const { toast } = useToast();
    const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            ingredients: [""],
            instructions: [""],
            tags: [],
            mealType: [],
            image: "https://example.com",
        },
    });

    const onSubmit = async (data: FormData) => {
        console.log(data);
        if (!image) {
            toast({
                title: "Please upload image",
                variant: "destructive",
                duration: 3000,
            });
            return;
        }

        try {
            const imageUrls = await uploadImage([image]);

            if (!imageUrls) {
                toast({
                    title: "Image upload failed",
                    variant: "destructive",
                    duration: 3000,
                });
                return;
            }

            // upload recipe to server
            const response = await createRecipe({
                variables: {
                    ...data,
                    image: imageUrls[0],
                    userId: 1,
                    rating: 5,
                    reviewCount: 0,
                },
            });

            toast({
                title: "Recipe uploaded successfully",
                variant: "default",
                duration: 3000,
            });
            const id = response.data.createRecipe._id;
            navigate(`/recipes/${id}`);
        } catch (e) {
            // console.log("error here", e.message);
            if ((e as Error).message === "Invalid password") {
                toast({
                    title: "Invalid password",
                    variant: "destructive",
                    duration: 3000,
                });
            } else {
                toast({
                    title: "Recipe upload failed",
                    variant: "destructive",
                    duration: 3000,
                });
            }
        }
    };
    return (
        <div className="max-w-[600px] mx-auto">
            <div>
                <h1 className="px-10 pt-8 pb-2 text-2xl font-semibold border-b">
                    Add Recipe
                </h1>
            </div>
            <FormProvider {...form}>
                <form
                    id="add-recipe-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 px-10 py-8 "
                >
                    <InputField
                        form={form}
                        name="name"
                        label="Name"
                        placeholder="Enter name of recipe"
                    />
                    {/* prep time minutes */}
                    <InputField
                        form={form}
                        name="prepTimeMinutes"
                        label=" Prep Time (minutes)"
                        type="number"
                        placeholder="Enter prep time"
                    />

                    {/* cook time minutes */}
                    <InputField
                        form={form}
                        name="cookTimeMinutes"
                        label="Cook Time (minutes)"
                        type="number"
                        placeholder="Enter cook time"
                    />

                    {/* servings */}
                    <InputField
                        form={form}
                        name="servings"
                        label="Servings"
                        type="number"
                        placeholder="Enter servings"
                    />

                    {/* calories per serving */}
                    <InputField
                        form={form}
                        name="caloriesPerServing"
                        label="Calories Per Serving"
                        type="number"
                        placeholder="Enter calories per serving"
                    />

                    <SelectField
                        form={form}
                        name="difficulty"
                        label="Difficulty"
                        options={DIFFICULTY_OPTIONS}
                    />
                    <SelectField
                        form={form}
                        name="cuisine"
                        label="Cuisine"
                        options={CUISINE_OPTIONS}
                    />

                    <MultiSelect
                        form={form}
                        value="mealType"
                        label="Meal Type"
                        options={MEAL_TYPE_OPTIONS}
                    />

                    <MultiSelect
                        form={form}
                        value="tags"
                        label="Tags"
                        options={TAGS_OPTIONS}
                    />
                    <div className="p-2 overflow-hidden shadow rounded-xl bg-orange-50">
                        <h2 className="mb-2 font-semibold">Add Instructions</h2>
                        {form.watch("instructions").map((_, index) => {
                            return (
                                <Fragment key={index}>
                                    <InputField
                                        form={form}
                                        name={`instructions[${index}]`}
                                        label={`Step ${index + 1}`}
                                        placeholder="Enter instruction"
                                    />
                                </Fragment>
                            );
                        })}
                        <div className="flex flex-row justify-center gap-2">
                            {form.watch("instructions").length > 1 && (
                                <Button
                                    className="px-3 py-0 text-sm text-black underline rounded-full"
                                    size={"sm"}
                                    type="button"
                                    onClick={() =>
                                        form.setValue("instructions", [
                                            ...form
                                                .getValues()
                                                .instructions.slice(0, -1),
                                        ])
                                    }
                                >
                                    Remove Step
                                </Button>
                            )}
                            <Button
                                className="px-3 py-0 text-sm text-white bg-orange-500 rounded-full hover:bg-orange-600"
                                size={"sm"}
                                type="button"
                                onClick={() =>
                                    form.setValue("instructions", [
                                        ...form.getValues().instructions,
                                        "",
                                    ])
                                }
                            >
                                Add Step
                            </Button>
                        </div>
                    </div>

                    {/* ingredients */}
                    <div className="p-2 overflow-hidden shadow rounded-xl bg-orange-50">
                        <h2 className="mb-2 font-semibold">Add Ingredients</h2>
                        {form.watch("ingredients").map((_, index) => {
                            return (
                                <Fragment key={index}>
                                    <InputField
                                        form={form}
                                        name={`ingredients[${index}]`}
                                        label={`Ingredient ${index + 1}`}
                                        placeholder="Enter ingredient"
                                    />
                                </Fragment>
                            );
                        })}
                        <div className="flex flex-row justify-center gap-2">
                            {form.watch("ingredients").length > 1 && (
                                <Button
                                    className="px-3 py-0 text-sm text-black underline rounded-full"
                                    size={"sm"}
                                    type="button"
                                    onClick={() =>
                                        form.setValue("ingredients", [
                                            ...form
                                                .getValues()
                                                .ingredients.slice(0, -1),
                                        ])
                                    }
                                >
                                    Remove Ingredient
                                </Button>
                            )}
                            <Button
                                className="px-3 py-0 text-sm text-white bg-orange-500 rounded-full hover:bg-orange-600"
                                size={"sm"}
                                type="button"
                                onClick={() =>
                                    form.setValue("ingredients", [
                                        ...form.getValues().ingredients,
                                        "",
                                    ])
                                }
                            >
                                Add Ingredient
                            </Button>
                        </div>
                    </div>

                    {/* image */}
                    <label htmlFor="image" className="">
                        Upload Image
                    </label>

                    <div
                        onClick={() =>
                            document.getElementById("image")?.click()
                        }
                        className="relative border-[1px] cursor-pointer rounded border-slate-200 bg-background placeholder:text-[rgba(11,66,97,0.50)]"
                    >
                        <Input
                            id="image"
                            type="file"
                            style={{ display: "none" }} // Hide the default file input
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;

                                const ext = file.name.split(".").pop() || " ";

                                if (
                                    !["jpg", "jpeg", "png", "webp"].includes(
                                        ext
                                    )
                                ) {
                                    toast({
                                        title: "File Upload Failed",
                                        description:
                                            "Only Image files are allowed",
                                        variant: "destructive",
                                        duration: 3000,
                                    });
                                    console.log("Only Image files are allowed");
                                    return;
                                }
                                setImage(file);
                            }}
                        />
                        <div className="flex items-center justify-start">
                            <UploadIcon className="w-6 h-6 mx-4 my-2 cursor-pointer" />
                            <span className="text-sm">
                                {image && image instanceof File
                                    ? limitCharacters(image.name, 50)
                                    : "No image selected"}
                            </span>
                        </div>
                    </div>
                    {image && image instanceof File && (
                        <div className="">
                            <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                className="object-cover w-20 h-20"
                            />
                        </div>
                    )}
                    <div className="flex flex-row gap-2 p-2 overflow-hidden text-sm text-center shadow rounded-xl bg-blue-50">
                        <InfoIcon className="w-4 h-4 my-1" />
                        <p className="m-0">
                            You need the password to upload the recipe. Contact
                            saiflll284@gmail.com if you don't have it.
                        </p>
                    </div>
                    <InputField
                        form={form}
                        name="password"
                        label="password"
                        placeholder="Enter password"
                    />
                    <Button
                        className="w-full px-3 text-sm text-white bg-orange-500 rounded-full hover:bg-orange-600 max-w-[200px] mx-auto"
                        type="submit"
                    >
                        upload
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
};

export default AddRecipe;
