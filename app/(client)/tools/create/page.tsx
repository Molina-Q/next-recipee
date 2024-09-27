"use client"
import { useState } from "react";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { CldUploadWidget } from 'next-cloudinary';

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Name is required.",
    }),
    image: z.instanceof(File).optional(),
});

export default function ToolForm() {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            image: undefined,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const formData = new FormData();
            formData.append("name", values.name);
            if (values.image) {
                formData.append("image", values.image);
            }

            const response = await fetch("/api/tool/create", {
                method: "POST",
                body: formData,
                // Don't set Content-Type header, let the browser set it with the boundary
            });

            const data = await response.json();
            console.log(data);
            // Handle success (e.g., show a success message, redirect, etc.)
        } catch (error) {
            console.error("Error creating Recipe:", error);
            // Handle error (e.g., show an error message)
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Banana bread..." {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { value, onChange, ...field } }) => (
                        <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <CldUploadWidget signatureEndpoint="/api/sign-image">
                                    {({ open }) => {
                                        return (
                                            <button onClick={() => open()}>
                                                Upload an Image
                                            </button>
                                        );
                                    }}
                                </CldUploadWidget>
                            </FormControl>
                            {previewUrl && (
                                <Image src={previewUrl} alt="Preview" width={200} height={200} />
                            )}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="bg-slate-950 text-white" type="submit">Submit</Button>
            </form>
        </Form>
    );
}