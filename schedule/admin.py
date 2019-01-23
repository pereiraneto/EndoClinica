from django.contrib import admin

from .models import Consultation, Doctor, Patient, Procedure, MedicalRecord, ComplementaryExam, Anamnese, MedicalReportTemplate, MedicalReport, MedicalRecommendation, MedicalRecommendationTemplate


@admin.register(Consultation)
class ConsultationAdmin(admin.ModelAdmin):
    pass


@admin.register(Doctor)
class DoctorAdmin(admin.ModelAdmin):
    pass


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    pass


@admin.register(Procedure)
class ProcedureAdmin(admin.ModelAdmin):
    pass


@admin.register(MedicalRecord)
class MedicalRecordAdmin(admin.ModelAdmin):
    pass


@admin.register(ComplementaryExam)
class ComplementaryExamAdmin(admin.ModelAdmin):
    pass


@admin.register(Anamnese)
class AnamneseAdmin(admin.ModelAdmin):
    pass


@admin.register(MedicalReportTemplate)
class MedicalReportTemplateAdmin(admin.ModelAdmin):
    pass


@admin.register(MedicalReport)
class MedicalReportAdmin(admin.ModelAdmin):
    pass


@admin.register(MedicalRecommendationTemplate)
class MedicalRecommendationTemplateAdmin(admin.ModelAdmin):
    pass


@admin.register(MedicalRecommendation)
class MedicalRecommendationAdmin(admin.ModelAdmin):
    pass
