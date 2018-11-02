from django.contrib import admin
from django.urls import path, include
from schedule import views

urlpatterns = [
    path('accounts/', include(('django.contrib.auth.urls', 'accounts'), namespace='accounts')),
    path('admin/', admin.site.urls, name='admin'),
    path('', include('schedule.urls')),
    path('auth/', include('rest_auth.urls'))
]
