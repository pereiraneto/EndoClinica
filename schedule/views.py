from rest_framework import permissions, viewsets

from .models import Consultation, Doctor, Patient
from .serializers import ConsultationSerializer, DoctorSerializer, PatientSerializer


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