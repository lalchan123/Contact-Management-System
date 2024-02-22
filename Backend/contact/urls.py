from django.urls import path

from contact.views import *

urlpatterns = [

    # User registration api url
    path('register/', UserRegistrationAPIView.as_view()),

    # User login api url
    path('login/', UserLoginAPIView.as_view()),

    # Contact CRUD operations api url
    path('contact/', ContactAPIView.as_view()),
    path('contact/<int:pk>/', ContactAPIView.as_view()),
]    