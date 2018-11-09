from django.db import models
from django.contrib.auth.models import User

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


class Patient(models.Model):
    name = models.CharField(max_length=100)

    birth_date = models.DateField(auto_now=False, auto_now_add=False)
    POSSIBLE_GENDER = ((gender, gender) for gender in GENDERS)
    gender = models.CharField(choices=POSSIBLE_GENDER, max_length=10)
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
    POSSIBLE_MARITAL_STATE = ((state, state) for state in MARITAL_STATES)
    marital_status = models.CharField(max_length=15, blank=True, choices=POSSIBLE_MARITAL_STATE)

    cpf = models.CharField(max_length=15, blank=True)
    rg = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.name


class Consultation(models.Model):
    class Meta:
        ordering = ('date', )
    POSSIBLE_STATUS = (
        (status, status)
        for status in STATUS_NAMES
    )
    status = models.CharField(
        choices=POSSIBLE_STATUS,
        max_length=15,
        default="Agendado"
    )

    date = models.DateTimeField(auto_now=False, auto_now_add=False)

    duration = models.CharField(
        max_length=2,
        choices=[
            (str(n), str(n)) for n in range(5, 61, 5)
        ],
        default=15
    )

    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)

    PRIORITIES = (
        (prioritie, prioritie)
        for prioritie in PRIORITIES_NAMES
    )
    priority = models.CharField(
        choices=PRIORITIES, max_length=15, default="Normal")

    prepare = models.TextField(blank=True)

    insurance = models.CharField(max_length=50)

    cell_phone = models.CharField(max_length=25)

    phone = models.CharField(max_length=25, blank=True)

    birth_date = models.DateField(auto_now=False, auto_now_add=False)

    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)

    procedure = models.ForeignKey(Procedure, on_delete=models.CASCADE)

    details = models.TextField(blank=True)

    requester = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return "{patient} > {date}".format(patient=self.patient.name, date=self.date)
