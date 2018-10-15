from django.db import models
PROCEDURES_NAMES = [
    "Cápsula Endoscópica",
    "Colonoscopia", "Consulta",
    "Corpo estranho", "CPRE",
    "Diverticulectomia", "Ecoendoscopia",
    "Parecer", "Retorno",
    "Retosigmoidoscopia"
]


class Consultation(models.Model):
    CREATED = 'CT'
    CONFIRMED = 'CF'
    WAITING = 'WT'
    CONCLUDED = 'CL'
    QUITED = 'QT'
    POSSIBLE_STATUS = (
        (CREATED, "Agendado"),
        (CONFIRMED, "Confirmado"),
        (WAITING, "Chegou"),
        (CONCLUDED, "Realizado"),
        (QUITED, "Desmarcado")
    )
    status = models.CharField(
        choices=POSSIBLE_STATUS,
        max_length=2,
        default=CREATED
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

    AMBULATORY = 'AB'
    INTERNED = 'IT'
    ISOLATION = 'IS'
    URGENCY = 'UR'
    OLD_MAN = 'OL'
    KID = 'KD'
    DEFICIENT = 'DF'
    PRIORITIES = (
        (AMBULATORY, 'Ambulatorio'),
        (INTERNED, 'Internado'),
        (ISOLATION, 'Isolamento'),
        (URGENCY, 'Urgencia'),
        (OLD_MAN, 'Idoso'),
        (KID, 'Criança'),
        (DEFICIENT, 'Deficiente')
    )
    priority = models.CharField(choices=PRIORITIES, max_length=2)

    prepare = models.TextField()

    insurance = models.CharField(max_length=50)

    cell_phone = models.CharField(max_length=25)

    phone = models.CharField(max_length=25)

    PROCEDURES = (
        (str(i), PROCEDURES_NAMES[i])
        for i in range(0, len(PROCEDURES_NAMES))
    )
    procedure = models.CharField(max_length=2, choices=PROCEDURES)

    details = models.TextField()

    requester = models.CharField(max_length=100)

    birth_date = models.DateField(auto_now=False, auto_now_add=False)

    def __str__(self):
        return self.patient
