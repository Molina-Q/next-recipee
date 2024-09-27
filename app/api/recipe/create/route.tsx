import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    req: NextRequest
) {
    try {
        const { quantity, unit, tools, ingredients, title, instructions, imageUrl, diff, time, vegan, healthy, steps, categoryId } = await req.json();

        const recipe = await db.recipe.create({
            data: {
                title,
                instructions,
                imageUrl,
                diff,
                time,
                vegan,
                healthy,
                steps,
                categoryId,
                userId: "a1",
            }
        });

        const recipeTools: unknown[] = [];
        {
            tools.map(async (tool: string) => {
                const recipeTool = await db.recipeTool.create({
                    data: {
                        recipeId: recipe.id,
                        toolId: tool,
                    }
                });
                recipeTools.push(recipeTool);
            })
        }

        const recipeIngredients: unknown[] = [];
        {
            ingredients.map(async (ingredient: string) => {
                const recipeIngredient = await db.recipeIngredient.create({
                    data: {
                        recipeId: recipe.id,
                        ingredientId: ingredient,
                        quantity: quantity,
                        unit: unit,
                    }
                });
                recipeIngredients.push(recipeIngredient);
            })
        }

        return NextResponse.json([recipe]);

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}