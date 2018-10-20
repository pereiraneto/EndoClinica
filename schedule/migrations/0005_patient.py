# Generated by Django 2.1.2 on 2018-10-20 13:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0004_auto_20181019_2351'),
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('cell_phone', models.CharField(max_length=25)),
                ('phone', models.CharField(max_length=25)),
                ('birth_date', models.DateField()),
            ],
        ),
    ]
