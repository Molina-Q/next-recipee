import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    req: NextRequest
) {
    try {
        const { tools, ingredients, title, instructions, imageUrl, diff, time, vegan, healthy, steps, categoryId } = await req.json();

        const recipe = await db.recipe.create({
            data: {
                title,
                instructions,
                imageUrl,
                diff: Number(diff),
                time: Number(time),
                vegan,
                healthy,
                steps,
                categoryId,
                userId: "66ffa12e0714553176ae2485",
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
            ingredients.map(async (ingredient: any) => {
                const recipeIngredient = await db.recipeIngredient.create({
                    data: {
                        recipeId: recipe.id,
                        ingredientId: ingredient.id,
                        quantity: ingredient.quantity,
                        unit: ingredient.unit,
                    }
                });
                recipeIngredients.push(recipeIngredient);
            })
        }

        return NextResponse.json({recipe, recipeIngredients, recipeTools}, { status: 201 });

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}