
import pytest
from django.core.management import call_command
import os
import django
from django.conf import settings

@pytest.fixture(scope='session')
def django_db_setup(django_db_blocker):
    with django_db_blocker.unblock():
        call_command('migrate', run_syncdb=True)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()