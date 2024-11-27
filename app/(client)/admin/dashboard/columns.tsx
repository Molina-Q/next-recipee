"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Tool = {
    _id: string
    name: string
    imageUrl: string
}

export type Ingredient = {
    _id: string
    name: string
    imageUrl: string
}

export type Recipe = {
    _id: string
    title: string
    imageUrl: string
}

export const columns: ColumnDef<Tool>[] = [
    {
        accessorKey: "id",
        header: "#",
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "imageUrl",
        header: "Image",
    },
]
