import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
    req: NextRequest
) {
    try {
        const { name, imageUrl } = await req.json();

        const tool = await db.tool.create({
            data: {
                name,
                imageUrl
            }
        });

        return NextResponse.json([tool]);

    } catch (error) {
        console.log("error create Movie : ", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}