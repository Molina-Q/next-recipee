"use client"
import Image from "next/image";
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from "react";
import { CldUploadWidget } from "next-cloudinary";

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
    ingredients: string[];
}

interface Tool {
    name: string;
    imageUrl: string;
}

interface Ingredient {
    name: string;
    imageUrl: string;
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
            ingredients: [""],
        }
    )
    const [tools, setTools] = useState<Tool[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);

    useEffect(() => {
        async function fetchTools() {
            try {
                const response = await fetch("/api/tool");
                const data = await response.json();
                setTools(data.data);
            } catch (error) {
                console.error("Error fetching tools:", error);
            }
        }

        async function fetchIngredients() {
            try {
                const response = await fetch("/api/ingredient");
                const data = await response.json();
                setIngredients(data.data);
            } catch (error) {
                console.error("Error fetching ingredients:", error);
            }
        }

        fetchTools();
        fetchIngredients();
    }, []);

    const formSchema = z.object({
        title: z.string().min(1, {
            message: "Title is required.",
        }),
        instructions: z.string().min(1, {
            message: "Instructions are required.",
        }),
        imageUrl: z.any().optional(),
        diff: z.number().min(1, {
            message: "Difficulty must be at least 1.",
        }),
        time: z.number().min(1, {
            message: "Time must be at least 1 minute.",
        }),
        vegan: z.boolean(),
        healthy: z.boolean(),
        steps: z.array(z.string()).min(1, {
            message: "At least one step is required.",
        }),
        categoryId: z.string().min(1, {
            message: "Category ID is required.",
        }),
        tools: z.array(z.string()).min(1, {
            message: "At least one tool is required.",
        }),
        ingredients: z.array(z.string()).min(1, {
            message: "At least one ingredient is required.",
        }),
    });

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

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            instructions: "",
            imageUrl: "",
            diff: 1,
            time: 1,
            vegan: false,
            healthy: false,
            categoryId: "",
            steps: [""],
            tools: [""],
            ingredients: [""],
        },
    })

    const { fields, append } = useFieldArray({
        control: form.control,
        name: 'steps',
    });



    // 2. Define a submit handler.
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            // const formData = new FormData();
            // formData.append("title", values.title);
            // formData.append("instructions", values.instructions);
            // formData.append("imageUrl", values.imageUrl);
            // formData.append("diff", values.diff.toString());
            // formData.append("time", values.time.toString());
            // formData.append("vegan", values.vegan.toString());
            // formData.append("healthy", values.healthy.toString());
            // formData.append("steps", values.steps.toString());
            // formData.append("categoryId", values.categoryId);
            // formData.append("tools", values.tools.toString());
            // formData.append("ingredients", values.ingredients.toString());

            const response = await fetch("/api/recipe/create", {
                method: "POST",
                body: JSON.stringify(recipe),
            });

            const data = await response.json();

            console.log(data);


        } catch (error) {
            console.log("error create Recipe : ", error);
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-8 p-4">
            <div className="form-group">
                <label htmlFor="title" className="block text-sm font-medium ">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Banana bread..."
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div className="form-group">
                <label htmlFor="instructions" className="block text-sm font-medium ">Instructions</label>
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
                <label htmlFor="diff" className="block text-sm font-medium ">Difficulty /10</label>
                <input
                    id="diff"
                    name="diff"
                    type="number"
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div className="form-group">
                <label htmlFor="time" className="block text-sm font-medium ">Time (minutes)</label>
                <input
                    id="time"
                    name="time"
                    type="number"
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div className="form-group flex items-center space-x-2">
                <input
                    id="vegan"
                    name="vegan"
                    type="checkbox"
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="vegan" className="block text-sm font-medium ">Vegan</label>
            </div>

            <div className="form-group flex items-center space-x-2">
                <input
                    id="healthy"
                    name="healthy"
                    type="checkbox"
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="healthy" className="block text-sm font-medium ">Healthy</label>
            </div>

            <div className="form-group">
                <label htmlFor="steps" className="block text-sm font-medium ">Steps</label>
                <div className="space-y-2">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center space-x-2">
                            <textarea
                                id={`steps.${index}`}
                                name={`steps.${index}`}
                                placeholder={`Step ${index + 1}`}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => append('')}
                    className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add Step
                </button>
            </div>

            <div className="form-group">
                <label htmlFor="categoryId" className="block text-sm font-medium ">Category ID</label>
                <input
                    id="categoryId"
                    name="categoryId"
                    type="text"
                    placeholder="Category ID..."
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
            </div>

            <div className="form-group">
                <label htmlFor="tools" className="block text-sm font-medium ">Tools</label>
                <select 
                    name="tools" 
                    id="tools"
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >

                    {tools &&
                        tools.map((ingredient) => (
                            <option key={ingredient.name} value={ingredient.name}>{ingredient.name}</option>
                        ))
                    }
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="ingredients" className="block text-sm font-medium ">Ingredients</label>
                <select
                    id="ingredients"
                    name="ingredients"
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                    {ingredients &&
                        ingredients.map((ingredient) => (
                            <option key={ingredient.name} value={ingredient.name}>
                                {ingredient.name}
                            </option>
                        ))
                    }
                </select>
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