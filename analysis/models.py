from django.db import models
from reports.models import FinancialReport

class DataAnalysis(models.Model):
    reports = models.ManyToManyField(FinancialReport)
    analysis_date = models.DateTimeField(auto_now_add=True)
    results = models.JSONField()
    anomalies_detected = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-analysis_date']

class Anomaly(models.Model):
    analysis = models.ForeignKey(DataAnalysis, on_delete=models.CASCADE)
    description = models.TextField()
    severity = models.CharField(max_length=20)
    detected_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.severity} - {self.description[:50]}"