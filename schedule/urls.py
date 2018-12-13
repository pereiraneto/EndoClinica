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
router.register('api/anamneses', views.AnamneseViewSet, base_name='anamnese')
router.register('api/modelos-laudos', views.MedicalReportTemplateViewSet, base_name='medcail-report-template')
router.register('api/laudos', views.MedicalReportViewSet, base_name='medcail-report')

urlpatterns = [path('', views.ScheduleView.as_view(), name='schedule'),
               path('pacientes/', views.PatientsView.as_view(), name='list-patients'),
               path('pacientes/novo', views.NewPatientView.as_view(), name='create-patient'),
               path('pacientes/<int:patient>/', views.EditPatientView.as_view(), name='edit-patient'),
               path('consultas/nova', views.NewContultationView.as_view(), name='create-consultation'),
               path('api/consultas/filtrar', views.ConsultationFilter.as_view(), name='filter-consultation'),
               path('ficha-medica/<int:medical_record_id>', views.MedicalRecordView.as_view(), name='medical-record'),
               path('ficha-medica/<int:medical_record_id>/anamnese/nova', views.NewAnamneseView.as_view(), name='create-anamnese'),
               path('ficha-medica/anamneses/<int:anamnese_id>', views.EditAnamneseView.as_view(), name='edit-anamnese'),
               path('ficha-medica/<int:medical_record_id>/exame-complementar/novo', views.NewComplementaryExam.as_view(), name='create-complementary-exam'),
               path('ficha-medica/exames-complementares/<int:complementary_exam_id>', views.EditComplementaryExam.as_view(), name='edit-complementary-exam')]
urlpatterns += router.urls
