from django.db import models
from django.contrib.auth.models import User

class FinancialReport(models.Model):
    title = models.CharField(max_length=200)
    file = models.FileField(upload_to='reports/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.CASCADE)
    report_type = models.CharField(max_length=50)
    processed = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title

class ReportData(models.Model):
    report = models.ForeignKey(FinancialReport, on_delete=models.CASCADE)
    data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']