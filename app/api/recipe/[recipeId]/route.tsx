import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

type Params = {
    recipeId: string
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

        return NextResponse.json({ data: recipe, success: true }, { status: 200 });

    } catch (error) {
        console.log("error getting data : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}