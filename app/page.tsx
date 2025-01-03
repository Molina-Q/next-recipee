import SingleRecipeCard from "./_component/SingleRecipeCard";
import { Recipe } from "@/lib/types";

export default async function Home() {
  let recipes: Recipe[] | null = null;
  let error: string | null = null;

  try {
    recipes = await getRecipes();
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
  }

  return (
    <div>
      {error && <p>{error}</p>}

      {recipes && (
        <div className="flex flex-col justify-center items-center md:flex-row gap-2 ">
          {recipes.map((recipe) => (
            <SingleRecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </div>
      )}

    </div>
  );
}

async function getRecipes() {
  'use server';
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/recipe`, { method: 'GET' });
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  } catch (error) {
    throw new Error(`Failed to fetch recipes: ${error}`);
  }
}