
import React, { useEffect, useState } from "react";
import $ from "jquery";
import "./App.css"; 

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [newRecipe, setNewRecipe] = useState({ ingredients: "" });
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  
  useEffect(() => {
    $.ajax({
      url: "http://localhost:8000/api/recipes/", 
      method: "GET",
      success: (data) => setRecipes(data),
      error: (err) => console.error("Error fetching recipes:", err),
    });
  }, []);

  
  const handleGenerateRecipe = (e) => {
    e.preventDefault();
    $.ajax({
      url: "http://localhost:8000/api/generate-recipe/", 
      method: "POST",
      data: newRecipe,
      success: (data) => {
        setRecipes((prev) => [...prev, data]);
        setNewRecipe({ ingredients: "" });
      },
      error: (err) => console.error("Error generating recipe:", err),
    });
  };

  
  const handleRecipeClick = (recipeId) => {
    $.ajax({
      url: `http://localhost:8000/api/recipes/${recipeId}/grocery-items/`, // Replace with your backend API URL
      method: "GET",
      success: (data) => setSelectedRecipe({ ...data, id: recipeId }),
      error: (err) => console.error("Error fetching grocery list:", err),
    });
  };

  return (
    <div className="App">
      <h1>Recipe Generator</h1>

      
      <div>
        <h2>Recipes</h2>
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.id} onClick={() => handleRecipeClick(recipe.id)}>
              <h3>{recipe.name}</h3>
              <p>{recipe.description}</p>
              <p>Cooking Time: {recipe.cooking_time} minutes</p>
              <p>Tags: {recipe.tags}</p>
            </li>
          ))}
        </ul>
      </div>

      
      <div>
        <h2>Generate a Recipe</h2>
        <form onSubmit={handleGenerateRecipe}>
          <div>
            <label>Ingredients (comma-separated):</label>
            <input
              type="text"
              value={newRecipe.ingredients}
              onChange={(e) => setNewRecipe({ ingredients: e.target.value })}
              required
            />
          </div>
          <button type="submit">Generate Recipe</button>
        </form>
      </div>

      
      {selectedRecipe && (
        <div>
          <h2>Grocery List for {selectedRecipe.name}</h2>
          <ul>
            {selectedRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient.quantity} of {ingredient.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
