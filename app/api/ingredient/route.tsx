import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest
) {
    try {
        const ingredients = await db.ingredient.findMany();

        return NextResponse.json({ data: ingredients });

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}