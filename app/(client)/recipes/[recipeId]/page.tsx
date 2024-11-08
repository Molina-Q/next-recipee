import { RecipeType } from '@/app/types/interface';
import { List, NotepadText } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import Slider from '@/components/swiper/slider';
import Tabs from './_component/Tabs';
import DownloadPdf from '@/app/_component/DownloadPdf';
import FavoriteRecipe from './_component/FavoriteRecipe';
import NutriChart from './_component/NutriChart';

export const metadata = {
    title: "Recipe Details",
    description: "Generated by create next app",
};

export interface ResponseType {
    recipe: RecipeType;
    nutritional: any;
}

async function fetchRecipeData(recipeId: string) {
    try {
        if (recipeId === undefined) return null;

        const response = await fetch(`http://localhost:3000/api/recipe/${recipeId}`, { method: 'GET' });
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        if (!data) return null;


        return { recipe: data.recipe, nutri: data.nutritional };
    } catch (error) {
        return null;
    }
}

const DetailsRecipe = async ({ params }: { params: { recipeId: string } }) => {
    const data = await fetchRecipeData(params.recipeId);

    if (!data) return notFound();

    const { recipe, nutri } = data;

    return (
        <div className='flex flex-col justify-center gap-2 mb-5 md:px-24 lg:px-44'>
            <h1 className='text-5xl text-center'>{recipe.title}</h1>
            <div className='text-center'>
                <DownloadPdf recipeId={recipe.id}>
                    Download the Recipe
                </DownloadPdf>
            </div>

            <section className='mx-auto'>
                <Image
                    src={recipe.imageUrl}
                    height={300}
                    width={300}
                    alt={recipe.title}
                    className='rounded-md'
                />
            </section>

            <div>
                <FavoriteRecipe recipeId={recipe.id} />
            </div>

            <section className='my-3'>
                <span className='mb-3 text-2xl flex flex-row items-center gap-3'>
                    <List />
                    <h2>Steps</h2>
                </span>
                <Slider steps={recipe.steps} />
            </section>

            <div className='flex flex-col gap-4 md:flex-row '>
                <section className='flex-1'>
                    <span className='mb-3 text-2xl flex flex-row items-center gap-3'>
                        <NotepadText />
                        <h2>Instruction</h2>
                    </span>
                    <div className='bg-orange-100 dark:bg-slate-700 rounded-sm px-5 py-2'>
                        <p>{recipe.instructions}</p>
                    </div>
                </section>

                <section className='flex-1'>
                    <Tabs tabs={['Ingredients', 'Tools']} panels={recipe} />
                </section>
            </div>

            <div className='bg-orange-100 dark:bg-slate-700 rounded-sm px-5 py-2 flex items-center justify-center'>
                <section className='size-[300px]'>
                    <NutriChart dataset={nutri} />
                </section>
            </div>

        </div>
    );
};

export default DetailsRecipe;