export interface Recipe {
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

export interface Category {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    recipes: Recipe[];
}

export interface Ingredient {
    id: string;
    name: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    RecipeIngredient: RecipeIngredient[];
}

export interface Tool {
    id: string;
    name: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
    RecipeTools: RecipeTool[];
}
export interface Comment {
    id: string;
    recipeId: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface RecipeIngredient {
    id: string;
    recipeId: string;
    ingredientId: string;
    quantity: number;
    unit: string;
    createdAt: Date;
    updatedAt: Date;
    recipes: Recipe;
    ingredients: Ingredient;
}
export interface RecipeTool {
    id: string;
    recipeId: string;
    toolId: string;
    createdAt: Date;
    updatedAt: Date;
    recipes: Recipe;
    tools: Tool;
}

export interface User {
    id: string;
    email: string;
    username: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    Recipes: Recipe[];
} 