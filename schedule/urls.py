from django.urls import path
from rest_framework import routers
from schedule import views

app_name = 'Schedule'

router = routers.DefaultRouter()

router.register('api/consultas', views.ConsultationViewSet,
                base_name='consultation')
router.register('api/medicos', views.DoctorViewSet, base_name='doctor')
router.register('api/procedimentos', views.ProcedureViewSet, base_name='procedure')
router.register('api/pacientes', views.PatientViewSet, base_name='patient')

urlpatterns = [path('', views.ScheduleView.as_view(), name='schedule'),
                path('consultas/nova', views.NewContultationView.as_view(), name='create-consultation'),
                path('pacientes/novo', views.NewPatientView.as_view(), name='create-patient'),
                path('api/consultas/filtrar', views.ConsultationFilter.as_view(), name='filter-consultation')]
urlpatterns += router.urls
