# Generated by Django 2.1.2 on 2018-12-13 13:42

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0010_medicalreporttemplate'),
    ]

    operations = [
        migrations.CreateModel(
            name='MedicalReport',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('requester', models.CharField(max_length=100)),
                ('report_type', models.CharField(max_length=70)),
                ('json_medical_report', models.TextField()),
                ('doctor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='schedule.Doctor')),
                ('medical_record', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='schedule.MedicalRecord')),
            ],
        ),
    ]