import { cloudinary } from '@/lib/cloudinaryConfig';
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
                imageUrl: imageUrl.secure_url
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