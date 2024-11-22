import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
    recipeId: string
}

interface RecipeIngredient {
    quantity: number;
    unit: string;
    ingredient: {
        name: string;
    };
}

export async function GET(
    req: NextRequest,
    context: { params: Params }
) {
    try {
        const recipeId = context.params.recipeId;
        const recipe = await db.recipe.findUnique({
            where: {
                id: recipeId,
            },
            include: {
                RecipeIngredients: {
                    include: {
                        ingredient: true,
                    },
                },
                RecipeTools: {
                    include: {
                        tool: true,
                    },
                },
            },
        });

        if (!recipe) {
            return NextResponse.json({ success: false }, { status: 404 });
        }

        const ingredients = recipe.RecipeIngredients.map((ri: RecipeIngredient) => `${ri.quantity} ${ri.unit} ${ri.ingredient.name}`).join('\n');

        // Make a POST request to the Edamam API
        const edamamResponse = await fetch(
            `https://api.edamam.com/api/nutrition-details?app_id=${process.env.NEXT_EDAMAM_ID}&app_key=${process.env.NEXT_EDAMAM_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: recipe.title,
                    ingr: ingredients.split('\n'),
                }),
            }
        );

        if (!edamamResponse.ok) {
            throw new Error('Failed to fetch nutritional data from Edamam API');
        }

        const nutritionalData = await edamamResponse.json();

        return NextResponse.json({ recipe: recipe, nutritional: nutritionalData, success: true }, { status: 200 });

    } catch (error) {
        console.log("error getting data : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}