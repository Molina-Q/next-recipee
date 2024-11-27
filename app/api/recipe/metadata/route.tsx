import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'

export async function GET(
    req: NextRequest
) {
    try {
        const ingredients = await db.ingredient.findMany();
        const tools = await db.tool.findMany();
        const categories = await db.category.findMany();

        return NextResponse.json({ingredients, tools, categories});

    } catch (error) {
        console.log("error getting data : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}