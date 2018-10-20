from django.contrib import admin

from .models import Consultation, Doctor, Patient

@admin.register(Consultation)
class ConsultationAdmin(admin.ModelAdmin):
    pass

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    pass

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    pass