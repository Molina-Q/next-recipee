"use client"
import { Star } from 'lucide-react'
import React, { useEffect } from 'react'

interface FavoriteRecipeProps {
    recipeId: string;
}

const FavoriteRecipe = ({ recipeId }: FavoriteRecipeProps) => {
    const [favorite, setFavorite] = React.useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== "undefined" && localStorage) {
            const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
            if (storedFavorites.includes(recipeId)) {
                setFavorite(true);
            }
        }
    }, [recipeId]);

    const handleFavorite = () => {
        setFavorite(!favorite);
        if (typeof window !== "undefined" && localStorage) {
            const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
            if (!favorite) {
                // Add to favorites
                const updatedFavorites = [...storedFavorites, recipeId];
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            } else {
                // Remove from favorites
                const updatedFavorites = storedFavorites.filter((id: string) => id !== recipeId);
                localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
            }
        }
    }

    return (
        <button onClick={handleFavorite}>
            <Star
                strokeWidth={1.75}
                className={`
                    text-yellow-500 transition-all 
                    ${favorite && "fill-yellow-500"}`
                }
            />
        </button>
    )
}

export default FavoriteRecipe