from rest_framework import permissions, viewsets, generics
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

class ConsultationFilter(generics.ListAPIView):
    serializer_class = ConsultationSerializer

    def get_queryset(self):
        objects = Consultation.objects.all()

        doctor = self.request.query_params.get('medico', None)
        initial_date = self.request.query_params.get('data_inicial', None)
        final_date = self.request.query_params.get('data_final', None)

        if doctor != 0:
            objects = objects.filter(doctor=doctor)
        if initial_date != None and final_date != None:
            objects = objects.filter(date__range=[initial_date+" 12:00:00+00:00", final_date+" 12:00:00+00:00"])

        return objects
