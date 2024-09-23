import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest
) {
    try {
        const recipe = await db.recipe.findMany();

        if (!recipe || recipe.length === 0) {
            return NextResponse.json({ message: "Recipe not found", success: false }, { status: 404 });
        }
        
        return NextResponse.json({ data: recipe, message: "Recipe found", success: true}, { status: 200 });

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}