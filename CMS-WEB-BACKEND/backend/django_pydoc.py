"""
    Configuracion para documentacion con pydoc de 
    un proyect django
"""
import os
import django
import pydoc



# Prepare Django before executing pydoc command
os.environ['DJANGO_SETTINGS_MODULE'] = 'backend.settings' # Change the value according to your django settings path
django.setup()

# Now executing pydoc
pydoc.cli()