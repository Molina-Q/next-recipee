import { Recipe } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const { recipees, loading, message } = useFetchRecipes();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (message) {
    return <div>{message}</div>;
  }

  return (
    <div>
      <h1>Recipes Website !</h1>
      { message && <p>{message}</p> }

      { 
        recipees && 
        <ul>
          {recipees.map((recipe) => (
            <li key={recipe.id}>
              <Link href={`/recipe/${recipe.id}`}>
                <p>{recipe.title}</p>
              </Link>
            </li>
          ))}
        </ul>
      }
      
    </div>
  );
}

const useFetchRecipes = () => {
  const [recipees, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const response = await fetch("/api/recipe");
        const data = await response.json();
        
        if (!data.success) {
          setMessage(data.message);
        } else {
          setRecipes(data.data);
        }
      } catch (error) {
        setMessage(String(error));
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();
  }, []);

  return { recipees, loading, message };
};
