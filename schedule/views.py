from rest_framework import permissions, viewsets
from django import views
from django.shortcuts import render

from .models import Consultation, Doctor, Patient, Procedure
from .serializers import ConsultationSerializer, DoctorSerializer, PatientSerializer, ProcedureSerializer


class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
    permission_classes = (permissions.AllowAny, )


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = (permissions.AllowAny, )


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = (permissions.AllowAny, )


class ProcedureViewSet(viewsets.ModelViewSet):
    queryset = Procedure.objects.all()
    serializer_class = ProcedureSerializer
    permission_classes = (permissions.AllowAny, )

class ScheduleView(views.View):
    def get(self, request):
        return render(request, 'schedule.html', {})

class NewContultationView(views.View):
    def get(self, request):
        return render(request, 'create-consultation.html', {})
