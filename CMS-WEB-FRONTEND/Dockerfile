# Establecemos el entorno de trabajo
FROM node:lts-alpine

# Establecemos el directorio de trabajo para docker
WORKDIR /cms/fronted

# copiamos los archivos que contienen las dependencias del frontend al directorio que creamos
# para docker
COPY package.json package-lock.json ./

# Instalamos las dependencias en el directorio de docker
RUN npm install

# Copiamos las dependencias instaladas en el directorio del docker a nuestro directorio de frontend
COPY . .

# Exponemos el puerto de desarrollo
EXPOSE 5173

# Ejecutamos el servidor de desarrollo
CMD [ "npm", "run", "dev"]