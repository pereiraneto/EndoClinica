import datetime

from django import views
from django.http import HttpResponse
from django.template import loader
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import get_object_or_404, render
from rest_framework import generics, permissions, viewsets

from .models import Consultation, Doctor, Patient, Procedure, MedicalRecord, ComplementaryExam, Anamnese, MedicalReportTemplate, MedicalReport, MedicalRecommendation, MedicalRecommendationTemplate, MedicalStatement, MedicalStatementTemplate
from .serializers import ConsultationSerializer, DoctorSerializer, PatientSerializer, ProcedureSerializer, MedicalRecordSerializer, ComplementaryExamSerializer, AnamneseSerializer, MedicalReportTemplateSerializer, MedicalReportSerializer, MedicalRecommendationSerializer, MedicalRecommendationTemplateSerializer, MedicalStatementSerializer, MedicalStatementTemplateSerializer


def is_doctor(user):
    if user.is_authenticated:
        return hasattr(user, 'doctor')


def render_not_allowed_view():
    t = loader.get_template('misc/http-response-401.html')
    return HttpResponse(t.render(), status=401)


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


class MedicalReportTemplateViewSet(viewsets.ModelViewSet):
    queryset = MedicalReportTemplate.objects.all()
    serializer_class = MedicalReportTemplateSerializer
    permission_classes = (permissions.IsAuthenticated,)


class MedicalReportViewSet(viewsets.ModelViewSet):
    queryset = MedicalReport.objects.all()
    serializer_class = MedicalReportSerializer
    permission_classes = (permissions.IsAuthenticated,)


class MedicalRecommendationViewSet(viewsets.ModelViewSet):
    queryset = MedicalRecommendation.objects.all()
    serializer_class = MedicalRecommendationSerializer
    permission_classes = (permissions.IsAuthenticated,)


class MedicalRecommendationTemplateViewSet(viewsets.ModelViewSet):
    queryset = MedicalRecommendationTemplate.objects.all()
    serializer_class = MedicalRecommendationTemplateSerializer
    permission_classes = (permissions.IsAuthenticated,)


class MedicalStatementViewSet(viewsets.ModelViewSet):
    queryset = MedicalStatement.objects.all()
    serializer_class = MedicalStatementSerializer
    permission_classes = (permissions.IsAuthenticated,)


class MedicalStatementTemplateViewSet(viewsets.ModelViewSet):
    queryset = MedicalStatementTemplate.objects.all()
    serializer_class = MedicalStatementTemplateSerializer
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

        this_week_monday = this_week_monday.isoformat()
        this_week_sunday = this_week_sunday.isoformat()

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

        if (not is_doctor(request.user)):
            return render_not_allowed_view()

        medical_record = get_object_or_404(
            MedicalRecord, pk=kwargs['medical_record_id'])
        

        data = {
            'medical_record_id': medical_record.id,
            'patient': medical_record.patient,
            'patient_id': medical_record.patient.id,
            'patient_age': medical_record.patient.birth_date.today().year - medical_record.patient.birth_date.year
        }

        return render(request, 'medical-record/medical-record.html', data)


class NewAnamneseView(LoginRequiredMixin, views.View):

    def get(self, request, **kwargs):

        if (not is_doctor(request.user)):
            return render_not_allowed_view()

        medical_record = get_object_or_404(MedicalRecord, pk=kwargs['medical_record_id'])
        patient = medical_record.patient

        data = {
            'is_edition_view': False,
            'today': datetime.date.today().isoformat(),
            'doctor_id': request.user.doctor.id,
            'doctor_name': request.user.doctor.name,
            'medical_record_id': medical_record.id,
            'patient_name': patient.name,
            'insurance': patient.insurance,
            'complementary_exams': medical_record.complementary_exams.all()
        }

        return render(request, 'medical-record/anamnese.html', data)


class EditAnamneseView(LoginRequiredMixin, views.View):

    def get(self, request, **kwargs):

        if (not is_doctor(request.user)):
            return render_not_allowed_view()

        anamnese = get_object_or_404(Anamnese, pk=kwargs['anamnese_id'])
        medical_record = anamnese.medical_record
        patient = medical_record.patient

        data = {
            'is_edition_view': True,
            'today': datetime.date.today().isoformat(),
            'doctor_id': request.user.doctor.id,
            'doctor_name': request.user.doctor.name,
            'medical_record_id': medical_record.id,
            'patient_name': patient.name,
            'insurance': patient.insurance,
            'anamnese_id': kwargs['anamnese_id'],
            'complementary_exams': medical_record.complementary_exams.all()
        }

        return render(request, 'medical-record/anamnese.html', data)


class NewComplementaryExam(LoginRequiredMixin, views.View):

    def get(self, request, **kwargs):

        if (not is_doctor(request.user)):
            return render_not_allowed_view()

        medical_record = get_object_or_404(MedicalRecord, pk=kwargs['medical_record_id'])
        patient = medical_record.patient

        data = {
            'edition_view': False,
            'today': datetime.date.today().isoformat(),
            'doctor_id': request.user.doctor.id,
            'doctor_name': request.user.doctor.name,
            'medical_record_id': medical_record.id,
            'patient_name': patient.name,
            'insurance': patient.insurance
        }

        return render(request, 'medical-record/complementary-exams.html', data)


class EditComplementaryExam(LoginRequiredMixin, views.View):

    def get(self, request, **kwargs):

        if (not is_doctor(request.user)):
            return render_not_allowed_view()

        exam = get_object_or_404(ComplementaryExam, pk=kwargs['complementary_exam_id'])

        data = {
            'edition_view': True,
            'patient_id': exam.medical_record.patient.id,
            'complementary_exam_id': kwargs['complementary_exam_id']
        }

        return render(request, 'medical-record/complementary-exams.html', data)


class NewMedicalReport(LoginRequiredMixin, views.View):

    def get(self, request, **kwargs):

        if (not is_doctor(request.user)):
            return render_not_allowed_view()

        now = datetime.datetime.now().isoformat()
        today, time_now = now.split('T')
        medical_report_templates = MedicalReportTemplate.objects.all()
        medical_record = get_object_or_404(MedicalRecord, pk=kwargs['medical_record_id'])

        data = {
            'medical_report_templates': medical_report_templates,
            'today': today,
            'time_now': time_now[:5],
            'medical_record_id': kwargs['medical_record_id'],
            'patient_name': medical_record.patient.name,
            'doctor': request.user.doctor
        }

        return render(request, 'medical-record/new-medical-report.html', data)

class EditMedicalReport(LoginRequiredMixin, views.View):

    def get(self, request, **kwargs):

        if (not is_doctor(request.user)):
            return render_not_allowed_view()

        medical_report = get_object_or_404(MedicalReport, pk=kwargs['medical_report_id'])
        report_datetime = medical_report.date.isoformat()
        data = {
            'medical_report': medical_report,
            'report_date': report_datetime[:10],
            'report_time': report_datetime[11:16],
        }

        return render(request, 'medical-record/edit-medical-report.html', data)


class NewMedicalRecommendation(LoginRequiredMixin, views.View):

    def get(self, request, **kwargs):

        if (not is_doctor(request.user)):
            return render_not_allowed_view()

        now = datetime.datetime.now().isoformat()
        today, time_now = now.split('T')
        medical_record = get_object_or_404(MedicalRecord, pk=kwargs['medical_record_id'])
        dorctors_recomendation_templates = MedicalRecommendationTemplate.objects.filter(doctor=request.user.doctor.id)

        data = {
            'today': today,
            'medical_record_id': kwargs['medical_record_id'],
            'patient_name': medical_record.patient.name,
            'doctor': request.user.doctor,
            'dorctors_recomendation_templates': dorctors_recomendation_templates
        }

        return render(request, 'medical-record/new-medical-recommendation.html', data)


class EditMedicalRecommendation(LoginRequiredMixin, views.View):

    def get(self, request, **kwargs):

        if (not is_doctor(request.user)):
            return render_not_allowed_view()

        medical_recommendation = get_object_or_404(MedicalRecommendation, pk=kwargs['medical_recommendation_id'])
        recommendation_datetime = medical_recommendation.date.isoformat()
        dorctors_recomendation_templates = MedicalRecommendationTemplate.objects.filter(doctor=request.user.doctor.id)

        data = {
            'medical_recommendation': medical_recommendation,
            'recommendation_date': recommendation_datetime[:10],
            'dorctors_recomendation_templates': dorctors_recomendation_templates
        }

        return render(request, 'medical-record/edit-medical-recommendation.html', data)


class NewMedicalStatement(LoginRequiredMixin, views.View):

    def get(self, request, **kwargs):

        if (not is_doctor(request.user)):
            return render_not_allowed_view()

        now = datetime.datetime.now().isoformat()
        today, time_now = now.split('T')
        medical_record = get_object_or_404(MedicalRecord, pk=kwargs['medical_record_id'])
        dorctors_medical_statement_templates = MedicalStatementTemplate.objects.filter(doctor=request.user.doctor.id)

        data = {
            'today': today,
            'time_now': time_now[:5],
            'medical_record_id': kwargs['medical_record_id'],
            'patient_name': medical_record.patient.name,
            'doctor': request.user.doctor,
            'dorctors_medical_statement_templates': dorctors_medical_statement_templates
        }

        return render(request, 'medical-record/new-medical-statement.html', data)


class EditMedicalStatement(LoginRequiredMixin, views.View):

    def get(self, request, **kwargs):

        if (not is_doctor(request.user)):
            return render_not_allowed_view()

        medical_statement = get_object_or_404(MedicalStatement, pk=kwargs['medical_statement_id'])
        medical_statement_datetime = medical_statement.date.isoformat()
        dorctors_statement_templates = MedicalStatementTemplate.objects.filter(doctor=request.user.doctor.id)

        print(dorctors_statement_templates)

        data = {
            'medical_statement': medical_statement,
            'medical_statement_date': medical_statement_datetime[:10],
            'medical_statement_time': medical_statement_datetime[11:16],
            'dorctors_statement_templates': dorctors_statement_templates
        }

        return render(request, 'medical-record/edit-medical-statement.html', data)
