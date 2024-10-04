"use client"
import { useState } from "react";
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { CldUploadWidget } from 'next-cloudinary';
import { Label } from "@/components/ui/label";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required.",
    }),
});

export default function CategoryForm() {
    const [category, setCategory] = useState<z.infer<typeof formSchema>>({
        name: "",
    });
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch("/api/category/create", {
                method: "POST",
                body: JSON.stringify(category),
            });

            const data = await response.json();

            console.log(data);
        } catch (error) {
            console.error("Error creating Tool:", error);
        }
    };
    
    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setCategory({
            ...category,
            [name]: value,
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 flex flex-col">
            <div>
                <Label>Name</Label>
                <Input type="text" id={"name"} name="name" value={category.name} onChange={handleChange} />
            </div>

            <Button className="bg-slate-950 text-white" type="submit">Submit</Button>
        </form>
    );
}