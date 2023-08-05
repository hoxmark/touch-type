# urls.py

from django.urls import path

from app.views import TypingExerciseList

urlpatterns = [
    path("exercises/", TypingExerciseList.as_view(), name="exercise-list"),
]
