from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/reports/', include('reports.urls')),
    path('api/analysis/', include('analysis.urls')),
    path('api/questionnaires/', include('questionnaires.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)