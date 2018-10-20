from schedule import views
from rest_framework import routers

app_name = 'Schedule'

router = routers.DefaultRouter()

router.register('consultas', views.ConsultationViewSet, base_name='consultation')
router.register('medicos', views.DoctorViewSet, base_name='doctor')
router.register('pacientes', views.PatientViewSet, base_name='patient')

urlpatterns = router.urls
