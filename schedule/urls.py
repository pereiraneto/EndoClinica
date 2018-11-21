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
router.register('api/fichas-medicas', views.MedicalRecordViewSet, base_name='medical-record')
router.register('api/exames-complementares', views.ComplementaryExamViewSet, base_name='complementary-exam')

urlpatterns = [path('', views.ScheduleView.as_view(), name='schedule'),
               path('pacientes/', views.PatientsView.as_view(), name='list-patients'),
               path('pacientes/novo', views.NewPatientView.as_view(), name='create-patient'),
               path('pacientes/<int:patient>/', views.EditPatientView.as_view(), name='edit-patient'),
               path('consultas/nova', views.NewContultationView.as_view(), name='create-consultation'),
               path('api/consultas/filtrar', views.ConsultationFilter.as_view(), name='filter-consultation'),
               path('ficha-medica/<int:medical_record_id>', views.MedicalRecordView.as_view(), name='medical-record')]
urlpatterns += router.urls
