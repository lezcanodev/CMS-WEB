# CMS WEB - GRUPO 06
### Ejecutar el proyecto en el entorno de desarrollo
##### **OBS:** se debe tener instalado docker (https://docs.docker.com/compose/install/#installation-scenarios)
## En la raíz del proyecto /CMS-WEB, ejecutar en orden:<br/>
1. <code>npm run docker:build</code> o <code>docker compose build</code>
2. <code>npm run docker:dev</code> o <code>docker compose up</code> y luego ingresar a http://localhost:5173/
3. finalizar los procesos <code>npm run docker:down</code> o <code>docker compose down</code>

## Para ejecutar las pruebas unitarias, en la raiz del proyecto ejecutar
### Pruebas para backend
<code>npm run api:test</code>

### Pruebas para fronted
<code>npm run web:test</code>