from django.db import models
from django.contrib.auth.models import User

class GroceryItem(models.Model):
    name = models.CharField(max_length=255)
    quantity = models.CharField(max_length=100)
    is_purchased = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name