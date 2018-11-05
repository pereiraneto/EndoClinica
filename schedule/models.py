from django.db import models
from django.contrib.auth.models import User

STATUS_NAMES = [
    "Agendado", "Confirmado", "Chegou", "Realizado", "Desmarcado"
]

PRIORITIES_NAMES = [
    "Normal", "Ambulatorio", "Internado", "Isolamento", "Urgencia", 
    "Idoso", "Criança", "Deficiente"
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

    cell_phone = models.CharField(max_length=25)

    phone = models.CharField(max_length=25, blank=True)

    birth_date = models.DateField(auto_now=False, auto_now_add=False)

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
    priority = models.CharField(choices=PRIORITIES, max_length=15, default="Normal")

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
        return "{patient} > {date}".format(patient= self.patient.name, date= self.date)