
from django.contrib.auth.models import User
from rest_framework import serializers
from contact.models import Contact



#user  serializers
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        exclude=['password']

#user registrations serializers
class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password:
            instance.set_password(password)
        instance.save()

        return instance
    


#user login serializers
class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)



#contact serializers
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name','email','phone_number','address']
    
    
    

