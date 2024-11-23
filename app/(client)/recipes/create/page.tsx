"use client"
import { z } from "zod"
import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RecipeForm {
    title: string;
    instructions: string;
    imageUrl: any;
    diff: number;
    time: number;
    vegan: boolean;
    healthy: boolean;
    steps: string[];
    categoryId: string;
    tools: string[];
    ingredients: IngredientFormData[];
}

interface Tool {
    id: string;
    name: string;
    imageUrl: string;
}

interface Ingredient {
    id: string;
    name: string;
    imageUrl: string;
}

interface IngredientFormData {
    id: string;
    quantity: number;
    unit: string;
}

interface Category {
    id: string;
    name: string;
}

export default function recipeForm() {

    const [recipe, setRecipe] = useState<RecipeForm>(
        {
            title: "",
            instructions: "",
            imageUrl: "",
            diff: 1,
            time: 1,
            vegan: false,
            healthy: false,
            steps: [""],
            categoryId: "",
            tools: [""],
            ingredients: [] as IngredientFormData[],
        }
    )

    const { ingredients, tools, categories } = useFetchData();

    // const formSchema = z.object({
    //     title: z.string().min(1, {
    //         message: "Title is required.",
    //     }),
    //     instructions: z.string().min(1, {
    //         message: "Instructions are required.",
    //     }),
    //     imageUrl: z.any().optional(),
    //     diff: z.number().min(1, {
    //         message: "Difficulty must be at least 1.",
    //     }),
    //     time: z.number().min(1, {
    //         message: "Time must be at least 1 minute.",
    //     }),
    //     vegan: z.boolean(),
    //     healthy: z.boolean(),
    //     steps: z.array(z.string()).min(1, {
    //         message: "At least one step is required.",
    //     }),
    //     categoryId: z.string().min(1, {
    //         message: "Category ID is required.",
    //     }),
    //     tools: z.array(z.string()).min(1, {
    //         message: "At least one tool is required.",
    //     }),
    //     ingredients: z.array(z.string()).min(1, {
    //         message: "At least one ingredient is required.",
    //     }),
    // });

    function handleSuccessUpload(result: any) {
        setRecipe({
            ...recipe,
            imageUrl: result.info.secure_url
        });
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setRecipe({
            ...recipe,
            [name]: value,
        });
    }

    function handleIngredients(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value, id, checked } = e.target;
        const ingredients = recipe.ingredients as IngredientFormData[];
        const ingredient = ingredients.find((ingredient) => ingredient.id === id);

        if (name === 'ingredients' && checked === false) {
            const index = ingredients.findIndex((ingredient) => ingredient.id === id);
            ingredients.splice(index, 1);
        }

        if (ingredient) {
            if (name === 'quantity') {
                ingredient[name] = parseFloat(value);
            } else if (name === 'unit') {
                ingredient[name] = value;
            }
        } else if (name === 'ingredients' && checked === true) {
            ingredients.push({ id, quantity: 0, unit: "" });
        }

        setRecipe({
            ...recipe,
            ingredients: removeEmptyIndices(ingredients)
        });
    }

    function handleTools(e: React.ChangeEvent<HTMLInputElement>) {
        const { id } = e.target;
        const tools = recipe.tools;

        if (tools.includes(id)) {
            const index = tools.indexOf(id);
            tools.splice(index, 1);
        } else {
            tools.push(id);
        }

        setRecipe({
            ...recipe,
            tools: removeEmptyIndices(tools)
        });
    }

    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, checked } = e.target;

        setRecipe({
            ...recipe,
            [name]: checked
        });
    }

    const handleStepsInputChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = event.target;
        const newDetails = [...recipe.steps];
        newDetails[index] = value;
        setRecipe({ ...recipe, steps: newDetails });
    };

    const addStep = () => {
        setRecipe({ ...recipe, steps: [...recipe.steps, ''] });
    };

    console.log("recipe : ", recipe);

    // 2. Define a submit handler.
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch("/api/recipe/create", {
                method: "POST",
                body: JSON.stringify(recipe),
            });

            console.log(response);
            

        } catch (error) {
            console.log("error create Recipe : ", error);
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-8 p-4">
            <div className="form-group">
                <Label htmlFor="title" className="block text-sm font-medium ">Title</Label>
                <Input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Banana bread..."
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div className="form-group">
                <Label htmlFor="instructions" className="block text-sm font-medium ">Instructions</Label>
                <textarea
                    id="instructions"
                    name="instructions"
                    placeholder="Step-by-step instructions..."
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div className="form-group">
                <CldUploadWidget
                    uploadPreset="next_upload_preset"
                    onSuccess={handleSuccessUpload}
                >
                    {({ open }) => {
                        return (
                            <button type="button" onClick={() => open()}>
                                Upload an Image
                            </button>
                        );
                    }}
                </CldUploadWidget>
            </div>

            <div className="form-group">
                <Label htmlFor="diff" className="block text-sm font-medium ">Difficulty /10</Label>
                <Input
                    id="diff"
                    name="diff"
                    type="number"
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div className="form-group">
                <Label htmlFor="time" className="block text-sm font-medium ">Time (minutes)</Label>
                <Input
                    id="time"
                    name="time"
                    type="number"
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div className="form-group flex items-center space-x-2">
                <Input
                    id="vegan"
                    name="vegan"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <Label htmlFor="vegan" className="block text-sm font-medium ">Vegan</Label>
            </div>

            <div className="form-group flex items-center space-x-2">
                <Input
                    id="healthy"
                    name="healthy"
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <Label htmlFor="healthy" className="block text-sm font-medium ">Healthy</Label>
            </div>

            <div className="form-group">
                <div className="space-y-2">
                    {recipe.steps.map((step, index) => (
                        <div key={index} className="flex flex-col space-x-2">
                            <Label htmlFor="steps">Steps {index + 1}</Label>
                            <textarea
                                id={'steps'}
                                name={"steps"}
                                value={step}
                                onChange={(event) => handleStepsInputChange(index, event)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={addStep}
                    className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add Step
                </button>
            </div>

            <div className="form-group">
                <Label htmlFor="categoryId" className="block text-sm font-medium ">Category ID</Label>
                <select
                    name="categoryId"
                    id="categoryId"
                    onChange={handleChange}
                    value={recipe.categoryId}
                >
                    <option value="">Select a category...</option>
                    {categories && categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <Label htmlFor="tools" className="block text-sm font-medium">Tools</Label>
                <div className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    {tools && tools.map((tool) => (
                        <div key={tool.name} className="flex items-center space-x-2">
                            <Input
                                type="checkbox"
                                id={tool.id}
                                name="tools"
                                value={tool.name}
                                onChange={handleTools}
                                className="h-4 w-4 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <Label htmlFor={`tool-${tool.name}`} className="block text-sm font-medium">
                                {tool.name}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>


            <div className="form-group">
                <Label htmlFor="ingredients" className="block text-sm font-medium">Ingredients</Label>
                <div className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
                    {ingredients && ingredients.map((ingredient) => (
                        <div key={ingredient.name} className="flex items-center space-x-2">
                            <Input
                                type="checkbox"
                                id={ingredient.id}
                                name="ingredients"
                                value={ingredient.name}
                                onChange={handleIngredients}
                                className="h-4 w-4 border-gray-300 rounded focus:ring-indigo-500"
                            />

                            <Label htmlFor={ingredient.name} className="block text-sm font-medium ">
                                {ingredient.name}
                            </Label>

                            <div>
                                <Input
                                    type="number"
                                    id={ingredient.id}
                                    name="quantity"
                                    placeholder="Quantity"
                                    onChange={handleIngredients}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />

                                <Input
                                    type="text"
                                    id={ingredient.id}
                                    name="unit"
                                    placeholder="Unit"
                                    onChange={handleIngredients}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Submit
            </button>
        </form>
    );
};

function removeEmptyIndices(arr: any[]) {
    return arr.filter(element => element !== null && element !== undefined && element !== '');
}

function useFetchData() {
    interface Data {
        categories: Category[];
        tools: Tool[];
        ingredients: Ingredient[];
    }

    const [metadata, setMetadata] = useState<Data>({
        categories: [],
        tools: [],
        ingredients: []
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/recipe/metadata", {
                    method: "GET",
                });
                const data = await response.json();
                setMetadata(data);
                console.log("data : ", data);
            } catch (error) {
                console.error("Error fetching tools:", error);
            }
        }

        fetchData();
    }, []);

    return { tools: metadata.tools, ingredients: metadata.ingredients, categories: metadata.categories };
}