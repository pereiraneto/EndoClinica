from rest_framework import permissions, viewsets, generics
from django import views
from django.shortcuts import render, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin

from .models import Consultation, Doctor, Patient, Procedure, MedicalRecord
from .serializers import ConsultationSerializer, DoctorSerializer, PatientSerializer, ProcedureSerializer, MedicalRecordSerializer


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


class MedicalRecordViewSet(viewsets.ModelViewSet):
    queryset = MedicalRecord.objects.all()
    serializer_class = MedicalRecordSerializer
    permission_classes = (permissions.IsAuthenticated,)


class ConsultationFilter(generics.ListAPIView):
    serializer_class = ConsultationSerializer

    def get_queryset(self):
        objects = Consultation.objects.all()

        doctor = self.request.query_params.get('medico', None)
        initial_date = self.request.query_params.get('data_inicial', None)
        final_date = self.request.query_params.get('data_final', None)

        if doctor != '0':
            objects = objects.filter(doctor=doctor)
        if initial_date != '0' and final_date != '0':
            objects = objects.filter(
                date__range=[initial_date+" 00:00:01+00:00", final_date+" 23:59:59+00:00"])
        return objects


class ScheduleView(LoginRequiredMixin, views.View):

    def get(self, request):
        doctor_id = '0'
        doctor = 'Selecione o médico'

        if request.user.is_authenticated:
            if hasattr(request.user, 'doctor'):
                doctor_id = request.user.doctor.id
                doctor = request.user.doctor

        return render(request, 'schedule/schedule.html', {'doctor_id': doctor_id, 'doctor': doctor})


class NewContultationView(LoginRequiredMixin, views.View):

    def get(self, request):
        doctor = False
        doctor_id = None
        procedures = None

        if request.user.is_authenticated:
            if hasattr(request.user, 'doctor'):
                doctor_id = request.user.doctor.id
                doctor = request.user.doctor
                procedures = request.user.doctor.procedure_set.all()

        return render(request, 'schedule/create-consultation.html', {'doctor_id': doctor_id, 'doctor': doctor, 'procedures': procedures})


class PatientsView(LoginRequiredMixin, views.View):

    def get(self, request):
        return render(request, 'patient/list-patients.html', {})


class NewPatientView(LoginRequiredMixin, views.View):

    def get(self, request):

        user_is_doctor = False

        if request.user.is_authenticated:
            if hasattr(request.user, 'doctor'):
                user_is_doctor = True

        return render(request, 'patient/patient-details.html',
                      {'edit_patient': False, 'user_is_doctor': user_is_doctor})


class EditPatientView(LoginRequiredMixin, views.View):

    def get(self, request, **kwargs):
        patient = get_object_or_404(Patient, pk=kwargs['patient'])

        user_is_doctor = False

        if request.user.is_authenticated:
            if hasattr(request.user, 'doctor'):
                user_is_doctor = True

        return render(request, 'patient/patient-details.html',
                      {'edit_patient': True, 'user_is_doctor': user_is_doctor, 'patient': patient})


class MedicalRecordView(LoginRequiredMixin, views.View):

    def get(self, request, **kwargs):
        medical_record = get_object_or_404(
            MedicalRecord, pk=kwargs['medical_record_id'])

        data = {
            'medical_record': medical_record,
            'patient': medical_record.patient,
            'patient_age': medical_record.patient.birth_date.today().year - medical_record.patient.birth_date.year
        }

        return render(request, 'medical-record/medical-record.html', data)
