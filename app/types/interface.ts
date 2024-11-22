import { Category, RecipeIngredient, RecipeTool, User } from "@/lib/types";


export interface RecipeType {
    id: string;
    title: string;
    instructions: string;
    imageUrl: string;
    diff: number;
    time: number;
    vegan: boolean;
    healthy: boolean;
    steps: string[];
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    categoryId: string;
    Category: Category;
    Author: User;
    RecipeTools: RecipeTool[];
    RecipeIngredients: RecipeIngredient[];
}

export interface RecipeIngredientType {
    id: number;
    quantity: number;
    unit: string;
    ingredient: IngredientType;
}

export interface IngredientType {
    id: number;
    name: string;
    imageUrl: string;
}

export interface RecipeToolType {
    id: number;
    tool: ToolType;
}

export interface ToolType {
    id: number;
    name: string;
    imageUrl: string;
}