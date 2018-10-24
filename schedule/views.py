from rest_framework import permissions, viewsets
from django import views
from django.shortcuts import render

from .models import Consultation, Doctor, Patient, Procedure
from .serializers import ConsultationSerializer, DoctorSerializer, PatientSerializer, ProcedureSerializer


class ConsultationViewSet(viewsets.ModelViewSet):
    queryset = Consultation.objects.all()
    serializer_class = ConsultationSerializer
    permissions_classes = (permissions.IsAuthenticated, )


class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    serializer_class = DoctorSerializer
    permissions_classes = (permissions.IsAuthenticated, )


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    permissions_classes = (permissions.IsAuthenticated, )


class ProcedureViewSet(viewsets.ModelViewSet):
    queryset = Procedure.objects.all()
    serializer_class = ProcedureSerializer
    permission_classes = (permissions.IsAuthenticated, )

class ScheduleView(views.View):
    def get(self, request):
        return render(request, 'schedule.html', {})
