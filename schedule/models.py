from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import JSONField

STATUS_NAMES = [
    "Agendado", "Confirmado", "Chegou", "Realizado", "Desmarcado"
]

PRIORITIES_NAMES = [
    "Normal", "Ambulatorio", "Internado", "Isolamento", "Urgencia",
    "Idoso", "Criança", "Deficiente"
]

MARITAL_STATES = [
    "Solteiro(a)", "Casado(a)", "Separado(a)", "Divorciado(a)", "Viúvo(a)"
]

GENDERS = [
    "Masculino", "Feminino"
]

COMPLMENENTARY_EXAM_TYPES = [
    "Antigliadina/Antiendomisio", "Bilirrubina total e frações", "Cápsula Endoscópica", 
    "COLONOSCOPIA", "CPRE", "Creatinina/Ureia", "EDA", "Hemograma", "LARINGOSCOPIA", 
    "Outros", "Retossigmoidoscopia", "RMN", "RX contrastado", "RX simples", "TAP/TTPA", 
    "TC", "TGO/TGP", "US Endoscopico", "USG abdomen", "USG PÉLVICO", "VHS"
]

DURATIONS = [n for n in range(5, 61, 5)]


def format_choices(choices): 
    return [(str(choice), str(choice)) for choice in choices]


class Doctor(models.Model):
    name = models.CharField(max_length=100)

    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Procedure(models.Model):
    name = models.CharField(max_length=100)

    doctors = models.ManyToManyField(Doctor)

    def __str__(self):
        return self.name


class MedicalRecord (models.Model):

    def __str__(self):
        return "ficha id = " + str(self.id)


class Patient(models.Model):
    class Meta:
        ordering = ('name', )
    name = models.CharField(max_length=100)

    birth_date = models.DateField(auto_now=False, auto_now_add=False)
    gender = models.CharField(choices=format_choices(GENDERS), max_length=10)
    allergies = models.CharField(max_length=150, blank=True)
    notes = models.TextField(blank=True)

    cell_phone = models.CharField(max_length=25, blank=True)
    phone = models.CharField(max_length=25, blank=True)
    email = models.EmailField(blank=True)

    insurance = models.CharField(max_length=50, blank=True)
    insurance_number = models.CharField(max_length=30, blank=True)

    address = models.CharField(max_length=150, blank=True)
    neighborhood = models.CharField(max_length=70, blank=True)
    city = models.CharField(max_length=70, blank=True)

    job = models.CharField(max_length=70, blank=True)
    marital_status = models.CharField(
        max_length=15, blank=True, choices=format_choices(MARITAL_STATES))

    cpf = models.CharField(max_length=15, blank=True)
    rg = models.CharField(max_length=15, blank=True)

    medical_record = models.OneToOneField(
        MedicalRecord, on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return self.name


class Consultation(models.Model):
    class Meta:
        ordering = ('date', )
    status = models.CharField(
        choices=format_choices(STATUS_NAMES),
        max_length=15,
        default="Agendado"
    )

    date = models.DateTimeField(auto_now=False, auto_now_add=False)
    duration = models.CharField(
        max_length=2,
        choices=format_choices(DURATIONS),
        default=15
    )

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    priority = models.CharField(
        choices=format_choices(PRIORITIES_NAMES), max_length=15, default="Normal")
    birth_date = models.DateField(auto_now=False, auto_now_add=False)

    insurance = models.CharField(max_length=50)
    insurance_number = models.CharField(max_length=30, blank=True)

    cell_phone = models.CharField(max_length=25, blank=True)
    phone = models.CharField(max_length=25, blank=True)
    email = models.EmailField(blank=True)

    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    procedure = models.ForeignKey(Procedure, on_delete=models.CASCADE)

    prepare = models.TextField(blank=True)
    details = models.TextField(blank=True)
    requester = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return "{patient} > {date}".format(patient=self.patient.name, date=self.date)


class ComplementaryExam(models.Model):
    date = models.DateTimeField(auto_now=False, auto_now_add=False)
    exam_type = models.CharField(
        max_length=30, blank=False, choices=format_choices(COMPLMENENTARY_EXAM_TYPES))
    result = models.TextField()
    doctor = models.ForeignKey(Doctor, null=True, related_name='complementary_exams', on_delete=models.SET_NULL)
    medical_record = models.ForeignKey(MedicalRecord, related_name='complementary_exams', null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.exam_type

class Anamnese(models.Model):
    date = models.DateField()
    main_complaint = models.CharField(max_length=50)
    hda = models.TextField(blank=True)
    pathology = models.TextField(blank=True)
    comorbidities = models.TextField(blank=True)
    medications = models.TextField(blank=True)
    alergies = models.CharField(max_length=50, blank=True)
    habits = models.TextField(blank=True)
    family_history = models.TextField(blank=True)
    physical_exam = models.TextField(blank=True)
    diagnostical_hypothesis = models.TextField(blank=True)
    conduct = models.TextField(blank=True)
    adicional_info = models.TextField(blank=True)
    insurance = models.CharField(max_length=30, blank=True)
    executed_exams = models.ManyToManyField(ComplementaryExam, blank=True)
    medical_record = models.ForeignKey(MedicalRecord, related_name='anamneses',
                                       null=True, on_delete=models.SET_NULL)
    doctor = models.ForeignKey(Doctor, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f'{self.medical_record} - {self.date}'


class MedicalReportTemplate(models.Model):
    name = models.CharField(max_length=70)
    json_template = JSONField()

    def __str__(self):
        return self.name


class MedicalReport(models.Model):
    medical_record = models.ForeignKey(MedicalRecord, null=True, on_delete=models.SET_NULL)
    doctor = models.ForeignKey(Doctor, null=True, on_delete=models.SET_NULL)

    date = models.DateTimeField()
    requester = models.CharField(max_length=100, blank=True)
    report_type = models.CharField(max_length=70)

    json_medical_report = JSONField()

    def __str__(self):
        return self.medical_record.patient.name + ' - ' + self.report_type
