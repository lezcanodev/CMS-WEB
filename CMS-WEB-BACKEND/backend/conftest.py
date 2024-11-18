import pytest
from django.core.management import call_command
import os
import django
from django.conf import settings



os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()