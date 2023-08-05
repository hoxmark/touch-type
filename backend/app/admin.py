# Register your models here.
from django.contrib import admin

from .models import Exercise, TypingExercise

admin.site.register(TypingExercise)
admin.site.register(Exercise)
