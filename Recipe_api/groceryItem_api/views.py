from django.shortcuts import render
from rest_framework import generics
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from .models import GroceryItem
from .serializers import GroceryItemSerializer


class GroceryItemListCreateView(generics.ListCreateAPIView):
    serializer_class = GroceryItemSerializer

    def get_queryset(self):
        return GroceryItem.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class GroceryItemToggleView(generics.UpdateAPIView):
    serializer_class = GroceryItemSerializer

    def get_object(self):
        return get_object_or_404(GroceryItem, pk=self.kwargs['pk'], user=self.request.user)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_purchased = not instance.is_purchased
        instance.save()
        return JsonResponse({'status': 'purchased status updated', 'is_purchased': instance.is_purchased})