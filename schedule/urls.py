from django.urls import path
from rest_framework import routers
from schedule import views

app_name = 'Schedule'

router = routers.DefaultRouter()

router.register('consultas', views.ConsultationViewSet, base_name='consultation')
router.register('medicos', views.DoctorViewSet, base_name='doctor')
urlpatterns = [path('', views.ScheduleView.as_view(), name='schedule')]

urlpatterns += router.urls
