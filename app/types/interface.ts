import { Recipe } from "@/lib/types";

export interface RecipeType extends Recipe {
    RecipeIngredients: RecipeIngredientType[];
    RecipeTools: RecipeToolType[];
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