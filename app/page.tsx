import { Recipe } from "@prisma/client";
import Link from "next/link";

async function getRecipes() {
  'use server';
  try {
    const response = await fetch(`/api/recipe`, { cache: 'no-store' });
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
            <li key={recipe.id}>
              <Link href={`/recipe/${recipe.id}`}>
                <p>{recipe.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}