# Generated by Django 2.1.2 on 2018-12-07 14:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0013_auto_20181201_1921'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='anamnese',
            name='patient',
        ),
        migrations.AddField(
            model_name='anamnese',
            name='medical_record',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='schedule.MedicalRecord'),
        ),
    ]
