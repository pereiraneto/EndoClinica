from rest_framework import permissions, viewsets
from django import views
from django.shortcuts import render

from .models import Consultation, Doctor
from .serializers import ConsultationSerializer, DoctorSerializer


class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
    permissions_classes = (permissions.IsAuthenticated, )

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permissions_classes = (permissions.IsAuthenticated, )

class ScheduleView(views.View):
    def get(self, request):
        return render(request, 'schedule.html', {});
