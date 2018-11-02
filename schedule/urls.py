from django.urls import path
from rest_framework import routers
from schedule import views

app_name = 'Schedule'

router = routers.DefaultRouter()

router.register('consultas', views.ConsultationViewSet,
                base_name='consultation')
router.register('medicos', views.DoctorViewSet, base_name='doctor')
router.register('procedimentos', views.ProcedureViewSet, base_name='procedure')
router.register('pacientes', views.PatientViewSet, base_name='patient')

urlpatterns = [path('', views.ScheduleView.as_view(), name='schedule'),
                path('consultas/nova', views.NewContultationView.as_view(), name='create-consultation')]
urlpatterns += router.urls
