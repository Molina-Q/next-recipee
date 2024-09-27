import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    req: NextRequest
) {
    try {
        const { name, image } = await req.json();

        const tool = await db.tool.create({
            data: {
                name,
                imageUrl: image
            }
        });

        return NextResponse.json([tool]);

    } catch (error) {
        console.log("error create Tool : ", String(error));
        return new NextResponse(
            JSON.stringify({ message: "Internal Server Error", error: error }),
            { status: 500 }
        );
    }
}