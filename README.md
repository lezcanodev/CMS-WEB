# CMS WEB - GRUPO 06
### Ejecutar el proyecto en el entorno de desarrollo
##### **OBS:** se debe tener instalado docker (https://docs.docker.com/compose/install/#installation-scenarios)
- Forma uno: <code>npm run dev</code>
- Forma dos: <code>docker compose up</code>
- Forma tres sin docker:
    **OBS:** debe haber un servidor Postgres corriendo con los parámetros indicados en ./CMS-WEB-BACKEND/backend/.env
    1. Primero ir a ./CMS-WEB-FRONTEND y ejecutar
        **OBS:** se debe tener instalado npm y node
        - <code>npm install</code>
        - <code>npm run dev</code>
    2. Segundo ir a ./CMS-WEB-BACKEND/backend y ejecutar
        **OBS:** se debe tener instalado PIP y python
        - <code>pip install -r requirements.txt</code>
        - <code>python manage.py makemigrations</code>
        - <code>python manage.py migrate</code>
        - <code>python manage.py runserver 0.0.0.0:8000</code>