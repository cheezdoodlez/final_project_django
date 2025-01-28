import requests

class ExternalRecipeAPI:
    BASE_URL = "https://api.spoonacular.com/recipes"
    API_KEY = "https://rapidapi.com/spoonacular/api/Recipe%20-%20Food%20-%20Nutrition/functions/Search%20Recipes%20Complex"  

    @staticmethod
    def search_recipes(query="", ingredients="", number=10):
       
        url = f"{ExternalRecipeAPI.BASE_URL}/complexSearch"
        params = {
            "query": query,
            "ingredients": ingredients,  # Use ingredients for the search
            "number": number,
            "apiKey": ExternalRecipeAPI.API_KEY
        }
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()  # Return recipe search results
        else:
            return {"error": f"Failed to fetch recipes: {response.status_code}"}

    @staticmethod
    def get_recipe_details(recipe_id):
      
        url = f"{ExternalRecipeAPI.BASE_URL}/{recipe_id}/information"
        params = {"apiKey": ExternalRecipeAPI.API_KEY}
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()  # Return recipe details
        else:
            return {"error": f"Failed to fetch recipe details: {response.status_code}"}
    @staticmethod
    def generate_recipe_from_ingredients(ingredients):
        
        url = f"{ExternalRecipeAPI.BASE_URL}/findByIngredients"
        params = {
            "ingredients": ingredients,
            "apiKey": ExternalRecipeAPI.API_KEY,
            "number": 1  # Get one recipe suggestion
        }
        response = requests.get(url, params=params)
        if response.status_code == 200:
            return response.json()  # Return the recipe found
        else:
            return {"error": f"Failed to generate recipe: {response.status_code}"}
