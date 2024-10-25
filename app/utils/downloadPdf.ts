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
    let yPosition = 20;

    // Add title
    doc.setFontSize(22);
    doc.text(recipe.title, 10, yPosition);
    yPosition += 10;

    // Add image
    if (recipe.imageUrl) {
        doc.addImage(recipe.imageUrl, "JPEG", 10, yPosition, 40, 40);
        yPosition += 50;
    }

    // Add time
    doc.setFontSize(16);
    doc.text(`Time: ${String(recipe.time)} min`, 10, yPosition);
    yPosition += 10;

    // Add instructions
    doc.setFontSize(14);
    doc.text('Instructions:', 10, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    doc.text(recipe.instructions, 10, yPosition);
    yPosition += 10;

    // Add steps
    doc.setFontSize(14);
    doc.text('Steps:', 10, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    recipe.steps.forEach((step, index) => {
        doc.text(`${index + 1}. ${step}`, 10, yPosition);
        yPosition += 10;
    });

    // Add tools
    yPosition += 10;
    doc.setFontSize(14);
    doc.text('Tools:', 10, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    recipe.RecipeTools.forEach((tool) => {
        doc.text(`- ${tool.tool.name}`, 10, yPosition);
        yPosition += 10;
    });

    // Add ingredients
    yPosition += 10;
    doc.setFontSize(14);
    doc.text('Ingredients:', 10, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    recipe.RecipeIngredients.forEach((ingredient) => {
        doc.text(`- ${ingredient.ingredient.name}: ${ingredient.quantity} ${ingredient.unit}`, 10, yPosition);
        yPosition += 10;
    });

    // Save the PDF
    doc.save(`${recipe.title}_recipe.pdf`);
}