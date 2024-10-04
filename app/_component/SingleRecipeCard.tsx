import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Recipe } from '@prisma/client';
import Image from 'next/image';
import React from 'react'
import { Heart, Sprout } from 'lucide-react';

type SingleRecipeCardProps = {
    recipe: Recipe;
}

const SingleRecipeCard: React.FC<SingleRecipeCardProps> = ({ recipe }) => {
    return (
        <Card className='w-fit'>
            <CardHeader>
                <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    width={300}
                    height={300}
                    className='rounded-lg'
                />

                <CardDescription>
                    {recipe.diff}
                </CardDescription>
                <CardDescription>
                    {recipe.time} min
                </CardDescription>
            </CardHeader>

            <CardContent>
                {recipe.title}
                <CardDescription>
                    {recipe.instructions}
                </CardDescription>
            </CardContent>


            <CardFooter>
                {recipe.vegan && <Sprout size={28} color="#80ff00" strokeWidth={1.25} />}
                {recipe.healthy && <Heart size={28} color="#00ff00" strokeWidth={1.25} />}
            </CardFooter>
        </Card>
    )
}

export default SingleRecipeCard;