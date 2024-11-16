from django.db import models
from django.contrib.auth.models import User

class Questionnaire(models.Model):
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    deadline = models.DateTimeField()
    client = models.ForeignKey(User, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.title

class Question(models.Model):
    questionnaire = models.ForeignKey(Questionnaire, on_delete=models.CASCADE)
    text = models.TextField()
    required = models.BooleanField(default=True)
    
    def __str__(self):
        return self.text[:50]

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    response = models.TextField()
    answered_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-answered_at']