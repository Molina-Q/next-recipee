// import { db } from '@/lib/db';
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(
//     req: NextRequest
// ) {
//     try {
//         const { title, instructions, imageUrl, diff, time, vegan, healthy, steps } = await req.json();

//         const recipe = await db.recipe.create({
//             data: {
//                 title,
//                 instructions,
//                 imageUrl,
//                 diff,
//                 time,
//                 vegan,
//                 healthy,
//                 steps
//             }
//         });

//         return NextResponse.json([recipe]);

//     } catch (error) {
//         console.log("error create Movie : ", error);
//         return new NextResponse("Internal Server Error", { status: 500 });
//     }
// }