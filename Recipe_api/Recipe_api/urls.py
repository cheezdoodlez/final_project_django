from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('recipes_api.urls')),  # Recipes API
    path('api/', include('ingredients_api.urls')),  # Ingredients API
    path('api/', include('mealPlan_api.urls')),  # Meal Plan API
    path('api/', include('groceryItem_api.urls')),  # Grocery Items API
]
