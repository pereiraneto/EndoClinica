from rest_framework import serializers
from rest_framework.decorators import action

from .models import Consultation, Doctor, MedicalRecord, Patient, Procedure, ComplementaryExam, Anamnese, MedicalReportTemplate, MedicalReport, MedicalRecommendation, MedicalRecommendationTemplate


class ConsultationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consultation
        fields = '__all__'


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'


class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'

    def create(self, request):
        patient_instance = super(PatientSerializer, self).create(request)
        medical_record_instance = MedicalRecord.objects.create()
        patient_instance.medical_record = medical_record_instance
        patient_instance.save()

        return patient_instance


class ProcedureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Procedure
        fields = '__all__'


class MedicalRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalRecord
        fields = ('id', 'complementary_exams', 'anamneses', 'medical_reports', 'medical_recommendation')


class ComplementaryExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplementaryExam
        fields = '__all__'


class AnamneseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Anamnese
        fields = '__all__'


class MedicalReportTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalReportTemplate
        fields = '__all__'


class MedicalReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalReport
        fields = '__all__'


class MedicalRecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalRecommendation
        fields = '__all__'


class MedicalRecommendationTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalRecommendationTemplate
        fields = '__all__'
