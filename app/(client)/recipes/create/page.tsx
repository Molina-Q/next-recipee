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

export default function recipeForm() {

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

    const DynamicStepsForm = () => {
        const form = useForm({
            defaultValues: {
                steps: [''],
            },
        });
    }

    const { fields, append } = useFieldArray({
        control: form.control,
        name: 'steps',
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("instructions", values.instructions);
            formData.append("imageUrl", values.imageUrl);
            formData.append("diff", values.diff.toString());
            formData.append("time", values.time.toString());
            formData.append("vegan", values.vegan.toString());
            formData.append("healthy", values.healthy.toString());
            formData.append("steps", values.steps.toString());
            formData.append("categoryId", values.categoryId);
            formData.append("tools", values.tools.toString());
            formData.append("ingredients", values.ingredients.toString());

            const response = await fetch("/api/recipe/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: formData,
            });

            const data = await response.json();

            console.log(data);
            
        } catch (error) {
            console.log("error create Recipe : ", error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Banana bread..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Instructions</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Step-by-step instructions..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                                <Input type="file" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="diff"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Difficulty /10</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Time (minutes)</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="vegan"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <FormLabel>Vegan</FormLabel>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="healthy"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <FormLabel>Healthy</FormLabel>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="steps"
                    render={() => (
                        <FormItem>
                            <FormLabel>Steps</FormLabel>
                            <FormControl>
                                <div className="space-y-2">
                                    {fields.map((field, index) => (
                                        <FormField
                                            key={field.id}
                                            control={form.control}
                                            name={`steps.${index}`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder={`Step ${index + 1}`}
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    ))}
                                </div>
                            </FormControl>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="mt-2"
                                onClick={() => append('')}
                            >
                                Add Step
                            </Button>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category ID</FormLabel>
                            <FormControl>
                                <Input placeholder="Category ID..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="tools"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tools</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Tool 1, Tool 2, ..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="ingredients"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Ingredients</FormLabel>
                            <FormControl>
                                <Select>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="bg-slate-950 text-white" type="submit">Submit</Button>
            </form>
        </Form>
    );
}