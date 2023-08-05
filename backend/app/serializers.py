from rest_framework import serializers

from .models import *


class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ["employee", "department"]


# serializers.py

from rest_framework import serializers

from .models import TypingExercise


class TypingExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypingExercise
        fields = ("id", "title", "content", "date_added")
