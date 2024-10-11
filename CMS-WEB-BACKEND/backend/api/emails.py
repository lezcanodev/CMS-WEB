from django.core.mail import send_mail

def enviar_notificacion_email(subject, message, recipient_list):
    send_mail(
        subject,
        message,
        'mailcmsweb@gmail.com',  # From email
        recipient_list,  # List of recipient emails
        fail_silently=False,
    )
