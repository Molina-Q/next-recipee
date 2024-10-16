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
    image: z.string(),
});

export default function IngredientForm() {
    const [ingredient, setIngredient] = useState<z.infer<typeof formSchema>>({
        name: "",
        image: '',
    });
    console.log(ingredient);
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await fetch("/api/ingredient/create", {
                method: "POST",
                body: JSON.stringify(ingredient),
            });

            const data = await response.json();

            console.log(data);
            
        } catch (error) {
            console.error("Error creating Tool:", error);
        }
    }

    async function handleSuccessUpload(result: any) {
        setIngredient({ 
            ...ingredient, 
            image: result.info.secure_url 
        });
    }

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setIngredient({
            ...ingredient,
            [name]: value,
        });
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 flex flex-col">
            <div>
                <Label>Name</Label>
                <Input type="text" id={"name"} name="name" value={ingredient.name} onChange={handleChange} />
            </div>

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

            <Button className="bg-slate-950 text-white" type="submit">Submit</Button>
        </form>
    );
}