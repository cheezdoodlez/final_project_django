from rest_framework import serializers
from .models import MealPlan
from recipes_api.models import Recipe
from recipes_api.serializers import IngredientSerializer

class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        fields = ['id', 'name', 'description', 'cooking_time', 'tags', 'ingredients', 'created_by']
        
class MealPlanSerializer(serializers.ModelSerializer):
    recipe = RecipeSerializer(read_only=True)

    class Meta:
        model = MealPlan
        fields = ['id', 'user', 'date', 'recipe']