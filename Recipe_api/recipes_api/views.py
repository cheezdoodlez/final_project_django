from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import ExternalRecipeAPI

class RecipeListView(APIView):
    # list recipes based on ingredients.
    
    def get(self, request):
        # Get ingredients from query params
        ingredients = request.query_params.get("ingredients", "")
        number = request.query_params.get("number", 10)

        if not ingredients:
            return Response({"error": "Ingredients parameter is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Search recipes by ingredients
        recipes = ExternalRecipeAPI.search_recipes(ingredients=ingredients, number=number)
        return Response(recipes)

class GenerateRecipeView(APIView):
    # generate a recipe from given ingredients.
    
    def post(self, request):
        ingredients = request.data.get("ingredients", "")
        
        if not ingredients:
            return Response({"error": "Ingredients are required"}, status=status.HTTP_400_BAD_REQUEST)
        
        generated_recipe = ExternalRecipeAPI.generate_recipe_from_ingredients(ingredients)
        return Response(generated_recipe, status=status.HTTP_201_CREATED)
    

class ExternalRecipeSearchView(APIView):
    # search for recipes using an external API.
    
    def get(self, request):
        query = request.query_params.get("query", "")
        number = request.query_params.get("number", 10)
        if not query:
            return Response({"error": "Query parameter is required"}, status=400)
        
        recipes = ExternalRecipeAPI.search_recipes(query, number)
        return Response(recipes)


class ExternalRecipeDetailView(APIView):
    #get recipe details from an external API.
    
    def get(self, request, recipe_id):
        recipe_details = ExternalRecipeAPI.get_recipe_details(recipe_id)
        return Response(recipe_details)
