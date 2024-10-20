# Generated by Django 5.1 on 2024-09-02 17:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserLogin',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=10, unique=True)),
                ('email', models.EmailField(max_length=254)),
                ('companyname', models.CharField(max_length=50)),
                ('details', models.CharField(max_length=100)),
            ],
        ),
        migrations.AlterField(
            model_name='blogpost',
            name='category',
            field=models.CharField(choices=[('world', 'World'), ('environment', 'Environment'), ('technology', 'Technology'), ('design', 'Design'), ('culture', 'Culture'), ('business', 'Business'), ('politics', 'Politics'), ('opinion', 'Opinion'), ('science', 'Science'), ('health', 'Health'), ('style', 'Style'), ('travel', 'Travel'), ('products', 'Products'), ('sports', 'Sports'), ('entertainment', 'Entertainment'), ('arts', 'Arts'), ('food', 'Food'), ('music', 'Music'), ('movies', 'Movies'), ('books', 'Books')], default='world', max_length=50),
        ),
    ]
