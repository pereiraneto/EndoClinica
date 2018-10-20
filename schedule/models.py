from django.db import models

PROCEDURES_NAMES = [
    "Cirurgia da cabeça e do pescoço", "Coloproctologia",
    "Gastroenterologia", "Proctologista",
    "Ecoendoscopia", "Endoscopia Digestiva Alta",
    "Colonoscopia", "Colangiografia Endoscópica Retrógrada – CPRE",
    "Retossigmoidoscopia", "Balão Intragástrico", "Manometria Anorretal",
    "pHmetria", "Manometria Esofágica"
]

STATUS_NAMES = [
    "Agendado", "Confirmado", "Chegou", "Realizado", "Desmarcado"
]

PRIORITIES_NAMES = [
    "Ambulatorio", "Internado", "Isolamento", "Urgencia", 
    "Idoso", "Criança", "Deficiente"
]

class Consultation(models.Model):
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

    patient = models.CharField(max_length=100)

    PRIORITIES = (
        (prioritie, prioritie)
        for prioritie in PRIORITIES_NAMES
    )
    priority = models.CharField(choices=PRIORITIES, max_length=15)

    prepare = models.TextField()

    insurance = models.CharField(max_length=50)

    cell_phone = models.CharField(max_length=25)

    phone = models.CharField(max_length=25)

    birth_date = models.DateField(auto_now=False, auto_now_add=False)

    PROCEDURES = (
        (procedure, procedure)
        for procedure in PROCEDURES_NAMES
    )
    procedure = models.CharField(max_length=25, choices=PROCEDURES)

    details = models.TextField()

    requester = models.CharField(max_length=100)

    def __str__(self):
        return self.patient


class Doctor(models.Model):
    name = models.CharField(max_length=100)

    procedures = models.TextField()

    def __str__(self):
        return self.name


class Patient(models.Model): 
    name = models.CharField(max_length=100)

    cell_phone = models.CharField(max_length=25)

    phone = models.CharField(max_length=25)

    birth_date = models.DateField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return self.name
