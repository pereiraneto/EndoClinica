from rest_framework import serializers
from rest_framework.decorators import action

from .models import Consultation, Doctor, MedicalRecord, Patient, Procedure, ComplementayExam


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
        fields = '__all__'


class ComplementayExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComplementayExam
        fields = '__all__'