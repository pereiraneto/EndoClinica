# Generated by Django 2.1.2 on 2018-11-09 13:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0009_auto_20181109_1248'),
    ]

    operations = [
        migrations.AlterField(
            model_name='patient',
            name='allergies',
            field=models.CharField(blank=True, max_length=150),
        ),
    ]
