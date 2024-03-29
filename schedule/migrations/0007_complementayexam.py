# Generated by Django 2.1.2 on 2018-11-21 22:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('schedule', '0006_auto_20181121_1313'),
    ]

    operations = [
        migrations.CreateModel(
            name='ComplementayExam',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField()),
                ('exam_type', models.CharField(choices=[('Antigliadina/Antiendomisio', 'Antigliadina/Antiendomisio'), ('Bilirrubina total e frações', 'Bilirrubina total e frações'), ('Cápsula Endoscópica', 'Cápsula Endoscópica'), ('COLONOSCOPIA', 'COLONOSCOPIA'), ('CPRE', 'CPRE'), ('Creatinina/Ureia', 'Creatinina/Ureia'), ('EDA', 'EDA'), ('Hemograma', 'Hemograma')], max_length=30)),
                ('result', models.TextField()),
            ],
        ),
    ]
