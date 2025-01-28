from django.urls import path
from .views import ExternalRecipeSearchView, ExternalRecipeDetailView, GenerateRecipeView, RecipeListView

urlpatterns = [
    path('recipes/', RecipeListView.as_view(), name='recipe-list'),
    path('search/', ExternalRecipeSearchView.as_view(), name='recipe-search'),
    path('<int:recipe_id>/', ExternalRecipeDetailView.as_view(), name='recipe-detail'),
    path('generate-recipe/', GenerateRecipeView.as_view(), name='generate-recipe'),
]
