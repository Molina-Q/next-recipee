import { getServerSession } from "next-auth/next";
import { options } from "@/app/api/auth/[...nextauth]/options"; 
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, options);

    if (session) {
        res.send({
            content:
                "This is protected content. You can access this content because you are signed in.",
        });
    } else {
        res.send({
            error: "You must be signed in to view the protected content on this page.",
        });
    }
}