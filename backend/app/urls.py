# urls.py

from app.views import ExerciseDetailView, ExerciseList
from django.urls import path

urlpatterns = [
    path("exercises/", ExerciseList.as_view(), name="exercise-list"),
    path(
        "exercise/<str:exercise_id>/",
        ExerciseDetailView.as_view(),
        name="exercise-detail",
    ),
]
