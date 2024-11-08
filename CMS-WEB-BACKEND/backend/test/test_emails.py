import pytest
from django.core import mail
from api.emails import enviar_notificacion_email  

@pytest.mark.django_db
def test_enviar_correo():
    # Llama a la función que envía el correo
    enviar_notificacion_email(
        subject="Asunto de prueba",
        message="Este es el contenido del correo",
        recipient_list=["destinatario@example.com"]
    )

    # Verifica que se haya enviado un correo
    assert len(mail.outbox) == 1
    
    # Verifica los detalles del correo
    email = mail.outbox[0]
    assert email.subject == "Asunto de prueba"
    assert email.to == ["destinatario@example.com"]
    assert "Este es el contenido del correo" in email.body
