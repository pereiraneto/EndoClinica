# Generated by Django 2.1.2 on 2018-11-21 13:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0005_auto_20181116_2012'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='patient',
            options={'ordering': ('name',)},
        ),
    ]