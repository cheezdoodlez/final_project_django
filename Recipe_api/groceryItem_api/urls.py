from django.urls import path
from .views import GroceryItemListCreateView, GroceryItemToggleView

urlpatterns = [
    path('grocery-items/', GroceryItemListCreateView.as_view(), name='grocery-item-list-create'),
    path('grocery-items/<int:pk>/toggle/', GroceryItemToggleView.as_view(), name='grocery-item-toggle'),
]
