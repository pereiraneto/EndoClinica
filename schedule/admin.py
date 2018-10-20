from django.contrib import admin

from .models import Consultation, Doctor

@admin.register(Consultation)
class ConsultationAdmin(admin.ModelAdmin):
    pass

@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    pass