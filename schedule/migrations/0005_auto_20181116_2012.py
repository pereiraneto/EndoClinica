# Generated by Django 2.1.2 on 2018-11-16 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0004_auto_20181115_1954'),
    ]

    operations = [
        migrations.AlterField(
            model_name='consultation',
            name='duration',
            field=models.CharField(choices=[('5', '5'), ('10', '10'), ('15', '15'), ('20', '20'), ('25', '25'), ('30', '30'), ('35', '35'), ('40', '40'), ('45', '45'), ('50', '50'), ('55', '55'), ('60', '60')], default=15, max_length=2),
        ),
    ]
