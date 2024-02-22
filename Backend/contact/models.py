from django.db import models

# Create your models here.


class Contact(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=250)
    email = models.EmailField(max_length=254)
    phone_number = models.CharField(max_length=11)
    address = models.TextField()

    def __str__(self):
        return f"{self.name}"
    