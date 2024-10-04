import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest
) {
    try {
        const recipes = await db.recipe.findMany();
        console.log("recipes : ", recipes);
        if (!recipes) {
            return NextResponse.json({ message: "Recipes not found", success: false }, { status: 404 });
        }
        
        return NextResponse.json({ data: recipes, message: "Recipes found", success: true}, { status: 200 });

    } catch (error) {
        console.log("error getting Recipes : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}