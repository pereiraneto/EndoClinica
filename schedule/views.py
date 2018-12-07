import datetime

from django import views
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404, render
from rest_framework import generics, permissions, viewsets

from .models import Consultation, Doctor, Patient, Procedure, MedicalRecord, ComplementaryExam, Anamnese
from .serializers import ConsultationSerializer, DoctorSerializer, PatientSerializer, ProcedureSerializer, MedicalRecordSerializer, ComplementaryExamSerializer, AnamneseSerializer



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


class ComplementaryExamViewSet(viewsets.ModelViewSet):
    queryset = ComplementaryExam.objects.all()
    serializer_class = ComplementaryExamSerializer
    permission_classes = (permissions.IsAuthenticated,)


class AnamneseViewSet(viewsets.ModelViewSet):
    queryset = Anamnese.objects.all()
    serializer_class = AnamneseSerializer
    permission_classes = (permissions.IsAuthenticated,)


class ConsultationFilter(generics.ListAPIView):
    serializer_class = ConsultationSerializer

    def get_queryset(self):
        objects = Consultation.objects.all()

        doctor = self.request.query_params.get('medico', None)
        initial_date = self.request.query_params.get('data_inicial', None)
        final_date = self.request.query_params.get('data_final', None)
        patient = self.request.query_params.get('paciente', None)

        if doctor != None and doctor != '0':
            objects = objects.filter(doctor=doctor)

        if patient != None:
            objects = objects.filter(patient=patient)
            
        if initial_date != None and final_date != None:
            if initial_date != '' and final_date != '':
                objects = objects.filter(
                    date__range=[initial_date+" 00:00:01+00:00", final_date+" 23:59:59+00:00"])
                
        return objects


class ScheduleView(LoginRequiredMixin, views.View):

    def get(self, request):
        doctor_id = '0'
        doctor = 'Selecione o médico'

        today = datetime.date.today()
        this_week = {'monday': None, 'sunday': None}
        this_week_monday = today - datetime.timedelta(today.weekday())
        this_week_sunday = this_week_monday + datetime.timedelta(6)

        this_week_monday = str(this_week_monday.year) + "-" + str(this_week_monday.month) + "-" + str(this_week_monday.day)
        this_week_sunday = str(this_week_sunday.year) + "-" + str(this_week_sunday.month) + "-" + str(this_week_sunday.day)

        if request.user.is_authenticated:
            if hasattr(request.user, 'doctor'):
                doctor_id = request.user.doctor.id
                doctor = request.user.doctor

        return render(request, 'schedule/schedule.html', {'doctor_id': doctor_id, 'doctor': doctor, 'this_week_monday': this_week_monday, "this_week_sunday": this_week_sunday})


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

        user_is_doctor = False

        if request.user.is_authenticated:
            if hasattr(request.user, 'doctor'):
                user_is_doctor = True

        return render(request, 'patient/list-patients.html', {"user_is_doctor": user_is_doctor})


class NewPatientView(LoginRequiredMixin, views.View):

    def get(self, request):

        user_is_doctor = False

        if request.user.is_authenticated:
            if hasattr(request.user, 'doctor'):
                user_is_doctor = True

        return render(request, 'patient/patient-details.html', {'edit_patient': False, 'user_is_doctor': user_is_doctor})


class EditPatientView(LoginRequiredMixin, views.View):

    def get(self, request, **kwargs):
        patient = get_object_or_404(Patient, pk=kwargs['patient'])

        user_is_doctor = False

        if request.user.is_authenticated:
            if hasattr(request.user, 'doctor'):
                user_is_doctor = True

        return render(request, 'patient/patient-details.html', {'edit_patient': True, 'user_is_doctor': user_is_doctor, 'patient': patient})


class MedicalRecordView(LoginRequiredMixin, views.View):

    def get(self, request, **kwargs):

        if request.user.is_authenticated:
            if not hasattr(request.user, 'doctor'):

                t = loader.get_template('misc/http-response-401.html')

                return HttpResponse(t.render(), status=401)

        medical_record = get_object_or_404(
            MedicalRecord, pk=kwargs['medical_record_id'])

        data = {
            'medical_record': medical_record,
            'patient': medical_record.patient,
            'patient_age': medical_record.patient.birth_date.today().year - medical_record.patient.birth_date.year
        }

        return render(request, 'medical-record/medical-record.html', data)
