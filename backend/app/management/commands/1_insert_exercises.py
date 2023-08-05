import json

from app.models import Exercise
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Insert exercises into the database"

    def handle(self, *args, **kwargs):
        data = json.load(open("app/exercises/1.json"))

        exercises = data.get("exercises", [])

        for exercise in exercises:
            Exercise.objects.create(
                exercise_id=exercise["exercise_id"],
                lesson_id=exercise["lesson_id"],
                name=exercise["name"],
                description=exercise["description"],
                tasks=exercise["tasks"],
            )

        self.stdout.write(
            self.style.SUCCESS("Successfully inserted exercises into the database!")
        )
