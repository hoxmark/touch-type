from django.db import models


# Create your models here.
class React(models.Model):
    employee = models.CharField(max_length=30)
    department = models.CharField(max_length=200)


class TypingExercise(models.Model):
    """
    content is a TextField which will store the actual content of the exercise.
    title is a CharField to give each exercise a title or name. This will be helpful if you decide to expand the MVP in the future with more exercises or categorization.
    date_added is a DateTimeField which auto-populates when an exercise is added to the database. This might be useful for sorting or identifying exercises later on.
    I've added a __str__ method to ensure that, in the admin interface or elsewhere, the exercise is represented by its title.
    The Meta class is optional but provides some default configurations, such as ordering the exercises by the date they were added.
    """

    content = models.TextField(
        verbose_name="Exercise Content", help_text="Content for the typing exercise"
    )
    title = models.CharField(
        max_length=200,
        verbose_name="Exercise Title",
        help_text="Title or name of the exercise",
        default="Typing Exercise",
    )
    date_added = models.DateTimeField(
        auto_now_add=True,
        verbose_name="Date Added",
        help_text="Date when the exercise was added",
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Typing Exercise"
        verbose_name_plural = "Typing Exercises"
        ordering = ["-date_added"]


class Exercise(models.Model):
    exercise_id = models.CharField(max_length=10, unique=True, primary_key=True)
    lesson_id = models.CharField(max_length=10)
    name = models.CharField(max_length=100)
    description = models.TextField()
    tasks = models.TextField()

    def __str__(self):
        return self.name
