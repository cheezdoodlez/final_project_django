from django.contrib.auth.models import User
from django.shortcuts import render
from rest_framework import generics
from . models import MealPlan
from .serializers import MealPlanSerializer


class MealPlanListCreateView(generics.ListCreateAPIView):
    serializer_class = MealPlanSerializer

    def get_queryset(self):
        return MealPlan.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)