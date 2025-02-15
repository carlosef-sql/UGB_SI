# Generated by Django 4.2.1 on 2023-06-02 21:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('produto', '0004_alter_produtos_cor'),
    ]

    operations = [
        migrations.CreateModel(
            name='Saidas',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('preco', models.DecimalField(decimal_places=2, default=0, max_digits=8, verbose_name='Preço')),
                ('quantidade', models.IntegerField(default=0, verbose_name='Quantidade')),
                ('produto', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='produto.produtos', verbose_name='Produto')),
            ],
        ),
    ]
