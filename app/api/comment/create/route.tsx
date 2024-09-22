import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    req: NextRequest
) {
    try {
        const { content, recipeId, userId } = await req.json();

        const comment = await db.comment.create({
            data: {
                content,
                recipeId,
                userId
            }
        });

        return NextResponse.json([comment]);

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}