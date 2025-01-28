from django.urls import path
from .views import MealPlanListCreateView

urlpatterns = [
    path('mealplans/', MealPlanListCreateView.as_view(), name='mealplan-list-create'),
]
