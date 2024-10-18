import jsPDF from "jspdf";
import { RecipeType } from "../types/interface";

async function fetchRecipe(recipeId: string) {
    try {
        console.log(recipeId);
        
        const response = await fetch(`/api/recipe/${recipeId}`)
        const data = await response.json();

        return data.data as RecipeType
    } catch (error) {
        console.log(error);
    }
}

export async function downloadPdf(recipeId: string) {

    const recipe = await fetchRecipe(recipeId)

    console.log("recipe : ", recipe);

    if (!recipe) return null

    const doc = new jsPDF();
    let ySteps = 70;

    doc.addImage(recipe.imageUrl, "jpeg", 10, 10, 40, 40);
    doc.text(`${recipe.title} - ${String(recipe.time)} min`, 10, 60);
    doc.text(recipe.instructions, 10, 70);
    recipe.steps.map((step, index) => {
        ySteps += 10;
        return doc.text(`${index + 1}. ${step}`, 20, ySteps);
    });
    doc.text(`Tools: ${recipe.RecipeTools.map((tool) => (tool.tool.name))}`, 10, 120);
    doc.text(`Ingredients: ${recipe.RecipeIngredients.map((ingredient) => (`${ingredient.ingredient.name} - ${ingredient.quantity} ${ingredient.unit}`))}`, 10, 130);

    doc.save(`${recipe.title}_recipe.pdf`);
}