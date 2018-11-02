from rest_framework import permissions, viewsets
from django import views
from django.shortcuts import render
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import Consultation, Doctor, Patient, Procedure
from .serializers import ConsultationSerializer, DoctorSerializer, PatientSerializer, ProcedureSerializer


class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
    permission_classes = (permissions.IsAuthenticated, )


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permission_classes = (permissions.IsAuthenticated, )


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ProcedureViewSet(viewsets.ModelViewSet):
    queryset = Procedure.objects.all()
    serializer_class = ProcedureSerializer
    permission_classes = (permissions.IsAuthenticated, )

class ScheduleView(LoginRequiredMixin, views.View):
    def get(self, request):
        return render(request, 'schedule/schedule.html', {})

class NewContultationView(LoginRequiredMixin, views.View):
    def get(self, request):
        return render(request, 'schedule/create-consultation.html', {})
