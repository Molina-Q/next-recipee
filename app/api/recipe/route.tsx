import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest
) {
    try {
        const recipes = await db.recipe.findMany();

        if (!recipes || recipes.length === 0) {
            return NextResponse.json({ message: "Recipe not found", success: false }, { status: 404 });
        }
        
        return NextResponse.json({ data: recipes, message: "Recipe found", success: true}, { status: 200 });

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}