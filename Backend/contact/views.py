#import package
from django.shortcuts import render
from rest_framework.views import *
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import *
from rest_framework.decorators import api_view, permission_classes

from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate



# import model
from contact.models import Contact


# import serializers
from contact.serializers import *



# Create your views here.

# =======================         User Registration With APIView        ========================
class UserRegistrationAPIView(APIView):
    permission_classes = (AllowAny, )
    
    def post(self, request, format=None):
        try:
            email = request.data['email']
            username = request.data['username']
            password = request.data['password'] 
        except  Exception as err:
            return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'{err} field is required'}, status=status.HTTP_400_BAD_REQUEST)   
        
        try:
            if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
                return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'User already registered.'}, status=status.HTTP_400_BAD_REQUEST)

            if validateEmail(email) == False:
                return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'Email is not valid, Please enter your valid email'}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer = UserRegistrationSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'status': status.HTTP_201_CREATED, 'type': 'success', 'message':'User Created Successfully', 'data': serializer.data},)
            return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'{err}'}, status=status.HTTP_400_BAD_REQUEST)




# =======================         User Login With APIView        ========================
class UserLoginAPIView(APIView):
    permission_classes = (AllowAny, )
    
    def post(self, request, format=None):
        try:
            username = request.data['username']
            password = request.data['password'] 
        except  Exception as err:
            return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'Email or Username, and Password  field is required'}, status=status.HTTP_400_BAD_REQUEST)   
        
        try:
            if User.objects.filter(username=username).exists() or User.objects.filter(email=username).exists():
                if validateEmail(username) == True:
                    user = User.objects.get(email=username)
                else:
                    user = User.objects.get(username=username)   
            else:
                return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'User not found'}, status=status.HTTP_400_BAD_REQUEST)   


            if user.is_active == False:
                return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'User not active'}, status=status.HTTP_400_BAD_REQUEST)     
            

            if user.check_password(password) and user.is_active: 
                serializer = UserLoginSerializer(data=request.data)
                if serializer.is_valid():
                    username = user.username
                    password = serializer.validated_data['password']
                    user = authenticate(username=username, password=password)
                    if user is not None:
                        refresh = RefreshToken.for_user(user)
                        serializer = UserSerializer(user,many=False)
                        return Response({'status': status.HTTP_200_OK, 'type': 'success', 'message':'User login Successfully','token': str(refresh.access_token), "user":serializer.data})
                    else:
                        return Response({'status': status.HTTP_401_UNAUTHORIZED, 'type': 'error', 'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
                return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':'Wrong Password ! try again'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as err:
            return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'{err}'}, status=status.HTTP_400_BAD_REQUEST)



# Email Validation 
def validateEmail( email ):
    from django.core.validators import validate_email
    from django.core.exceptions import ValidationError
    try:
        email = validate_email( email )
        return True
    except ValidationError:
        return False  
    
# Phone number Validation 
def validatePhoneNumber( phone_number ):
    try:
        int(phone_number)
        return True
    except Exception as err:
        return False  


# =======================         Contact CRUD operations With APIView        ========================
class ContactAPIView(APIView):
    permission_classes = (AllowAny, )

    def get_contact(self, pk):
            return Contact.objects.get(id=pk)
        
    def get(self, request, pk=None):
        if pk:
            instance = self.get_contact(pk)
            serializer = ContactSerializer(instance, context={'request':request})
        else:
            instance = Contact.objects.all().order_by('-id')
            serializer = ContactSerializer(instance, many=True, context={'request':request})
        return Response({'status': status.HTTP_200_OK, 'type': 'success',  'message':'Contact Data Found Successfully', 'data': serializer.data},)
    
    def post(self, request, format=None):
        try:
            name = request.data['name']
            email = request.data['email']
            phone_number = request.data['phone_number'] 
            address = request.data['address'] 
        except  Exception as err:
            return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'{err} field is required'}, status=status.HTTP_400_BAD_REQUEST)   

        try:

            if validateEmail(email) == False:
                return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'Email is not valid. Please enter your valid email'}, status=status.HTTP_400_BAD_REQUEST)
            
            if validatePhoneNumber(phone_number) == False: 
                return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'Phone number is not valid. Please enter your valid phone number'}, status=status.HTTP_400_BAD_REQUEST)
            if len(phone_number) < 11 or len(phone_number) > 11: 
                return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'Please 11 digit Phone number!'}, status=status.HTTP_400_BAD_REQUEST)
        
            serializer = ContactSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'status': status.HTTP_201_CREATED, 'type': 'success', 'message':'Contact Created Successfully', 'data': serializer.data},)
            return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as err:
            return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'{err}'}, status=status.HTTP_400_BAD_REQUEST)


    def put(self, request, pk):
        try:
            instance = Contact.objects.get(id=pk)    
        except Contact.DoesNotExist:
            return Response({'status': status.HTTP_404_NOT_FOUND, 'type': 'error', 'message':f'Contact Data Not Found'}, status=status.HTTP_404_NOT_FOUND)

        try:
            email = request.data['email']
            phone_number = request.data['phone_number'] 
       
            if validateEmail(email) == False:
                return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'Email is not valid. Please enter your valid email'}, status=status.HTTP_400_BAD_REQUEST)
            
            if validatePhoneNumber(phone_number) == False: 
                return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'Phone number is not valid. Please enter your valid phone number'}, status=status.HTTP_400_BAD_REQUEST)
            if len(phone_number) < 11 or len(phone_number) > 11: 
                return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'Please 11 digit Phone number!'}, status=status.HTTP_400_BAD_REQUEST)

            serializer = ContactSerializer(instance, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'status': status.HTTP_200_OK, 'type': 'success', 'message':'Contact updated Successfully', 'data': serializer.data},)
            return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as err:
            return Response({'status': status.HTTP_400_BAD_REQUEST, 'type': 'error', 'message':f'{err}'}, status=status.HTTP_400_BAD_REQUEST)



    def delete(self, request, pk):
        try:
            instance = Contact.objects.get(id=pk)
            instance.delete() 
            return Response({'status': status.HTTP_200_OK, 'type': 'success', 'message':'Contact deleted Successfully'},)
        except Contact.DoesNotExist:
            return Response({'status': status.HTTP_404_NOT_FOUND, 'type': 'error', 'message':f'Contact Data Not Found'}, status=status.HTTP_404_NOT_FOUND)
