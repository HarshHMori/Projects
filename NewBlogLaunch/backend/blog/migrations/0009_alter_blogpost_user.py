# Generated by Django 5.1 on 2024-09-21 10:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0008_alter_blogpost_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='user',
            field=models.CharField(default=1, max_length=50),
        ),
    ]
