import { Recipe } from "@prisma/client";
import Link from "next/link";
import SingleRecipeCard from "./_component/SingleRecipeCard";

async function getRecipes() {
  'use server';
  try {
    const response = await fetch("http://localhost:3000/api/recipe", { method: 'GET' });
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data as Recipe[];
  } catch (error) {
    throw new Error(`Failed to fetch recipes: ${error}`);
  }
}

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
      <h1>Recipes Website!</h1>
      {error && <p>{error}</p>}
      {recipes && (
        <ul>
          {recipes.map((recipe) => (
            <div key={recipe.id}>
              {/* <Link href={`/recipe/${recipe.id}`}> */}
                <SingleRecipeCard recipe={recipe} key={recipe.id} />
              {/* </Link> */}
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}