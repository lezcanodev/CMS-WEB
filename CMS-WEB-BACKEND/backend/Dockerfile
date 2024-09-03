# Establecemos el entorno de trabajo
FROM python:3.8-alpine

# Establecemos el directorio de trabajo para docker
WORKDIR /cms/backend

# copiamos los archivos que contienen las dependencias del backend al directorio que creamos
# para docker
COPY requirements.txt ./

# Instala herramientas de construcción necesarias
RUN apk add --no-cache gcc musl-dev libffi-dev
RUN pip install --upgrade pip setuptools

# Instala las dependencias de la aplicación
RUN pip install --no-cache-dir -r requirements.txt

# Copiamos las dependencias instaladas en el directorio del docker a nuestro directorio de backend
COPY . .

# Exponemos el puerto de desarrollo
EXPOSE 8000

#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

    