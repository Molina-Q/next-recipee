"use client"
import { useState } from "react";
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { CldUploadWidget } from 'next-cloudinary';
import { Label } from "@/components/ui/label";
import { toast } from "react-toastify";

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required",
    }),
    image: z.string().min(1, {
        message: "Image is required"
    }),
});

export default function IngredientForm() {
    const [ingredient, setIngredient] = useState<z.infer<typeof formSchema>>({
        name: "",
        image: '',
    });
    const [loading, setLoading] = useState(false)

    console.log(ingredient);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true)
        try {
            const verifyData = formSchema.parse(ingredient);

            const response = await fetch("/api/ingredient/create", {
                method: "POST",
                body: JSON.stringify(verifyData),
            });

            const data = await response.json();

            console.log(data);
            toast.success("Created new Ingredient !", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        } catch (error) {
            if (error instanceof z.ZodError) {
                return toast.error(error.errors.map(err => err.path).join(', ') + " required", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
            console.error("Error creating Tool:", error);
        } finally {
            setLoading(false);
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
        <>
            <h1 className="text-center">Create Ingredient</h1>

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

                <Button className="bg-slate-950 text-white" type="submit" disabled={loading}>{loading ? "Loading..." : "Submit"}</Button>
            </form>
        </>
    );
}