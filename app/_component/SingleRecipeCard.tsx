import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Recipe } from '@prisma/client';
import Image from 'next/image';
import React from 'react'
import { Heart, Sprout } from 'lucide-react';
import iconFromDifficulty from '../utils/iconFromDifficulty';
import Link from 'next/link';

type SingleRecipeCardProps = {
    recipe: Recipe;
}

const SingleRecipeCard: React.FC<SingleRecipeCardProps> = ({ recipe }) => {
    return (
        <Card className='w-fit h-[520px]'>
            <CardHeader>
                <Image
                    src={recipe.imageUrl}
                    alt={recipe.title}
                    width={300}
                    height={300}
                    className='size-[300px] rounded-lg object-cover'
                />

                <CardDescription className='flex flex-row' title={`Difficulty: ${recipe.diff}/5`}>
                    {[...Array(recipe.diff)].map((_, index) => (
                        <span key={index}>
                            {iconFromDifficulty(String(recipe.diff))}
                        </span>
                    ))}
                </CardDescription>
                
                <CardDescription>
                    {recipe.time} min
                </CardDescription>
            </CardHeader>

            <CardContent>
                <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
                <CardDescription>
                    {recipe.instructions}
                </CardDescription>
            </CardContent>

            <CardFooter>
                {recipe.vegan && <span title="Vegan"><Sprout size={28} color="#80ff00" strokeWidth={1.25} /></span>}
                {recipe.healthy && <span title="Healthy"><Heart size={24} color="#00ff00" strokeWidth={1.25} /></span>}
            </CardFooter>
        </Card>
    )
}

export default SingleRecipeCard;