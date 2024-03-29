# Generated by Django 2.1.2 on 2019-01-22 17:22

import django.contrib.postgres.fields.jsonb
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0013_auto_20181217_1756'),
    ]

    operations = [
        migrations.CreateModel(
            name='MedicalRecommendation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('json_medical_recommendation', django.contrib.postgres.fields.jsonb.JSONField()),
                ('doctor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='schedule.Doctor')),
                ('medical_record', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='medical_recommendation', to='schedule.MedicalRecord')),
            ],
        ),
        migrations.CreateModel(
            name='MedicalRecommendationTemplate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('json_medical_recommendation', django.contrib.postgres.fields.jsonb.JSONField()),
                ('doctor', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='schedule.Doctor')),
            ],
        ),
        migrations.AlterField(
            model_name='medicalreport',
            name='medical_record',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='medical_reports', to='schedule.MedicalRecord'),
        ),
    ]
