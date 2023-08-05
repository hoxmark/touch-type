from rest_framework import serializers

from .models import *


class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ["employee", "department"]


class TypingExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypingExercise
        fields = ("id", "title", "content", "date_added")


class ExerciseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exercise
        fields = ["exercise_id", "lesson_id", "name", "description", "tasks"]
