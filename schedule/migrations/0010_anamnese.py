# Generated by Django 2.1.2 on 2018-12-01 18:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0009_auto_20181129_1418'),
    ]

    operations = [
        migrations.CreateModel(
            name='Anamnese',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now=True)),
                ('main_complaint', models.CharField(max_length=50)),
                ('hda', models.TextField()),
                ('pathology', models.TextField()),
                ('comorbidities', models.TextField()),
                ('medications', models.TextField()),
                ('alergies', models.CharField(max_length=50)),
                ('habits', models.TextField()),
                ('family_history', models.TextField()),
                ('fisical_exam', models.TextField()),
                ('diagnostical_hypothesis', models.TextField()),
                ('conduct', models.TextField()),
                ('adicional_info', models.TextField()),
                ('fisical_exams', models.TextField()),
                ('insurance', models.CharField(max_length=30)),
                ('executed_exams', models.ManyToManyField(to='schedule.ComplementaryExam')),
            ],
        ),
    ]