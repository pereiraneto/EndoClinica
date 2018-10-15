from schedule import views
from rest_framework import routers

app_name = 'Consultation'

router = routers.DefaultRouter()
router.register('', views.ConsultationViewSet, base_name='consultation')

urlpatterns = router.urls
