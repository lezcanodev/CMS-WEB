# Frontend CMS WEB - Grupo 06

Front-End del proyecto Sistema de Administración de Contenido Web (CMS Web).

#  Tecnologías a utilizar
- <b>React Testing Library y Jest</b> se usaran para realizar testing sobre los componentes del GUI y sobre los metodos, clases, etc. (https://testing-library.com/docs/react-testing-library/intro/)
(https://jestjs.io/docs/getting-started)
<br/><br/>
- <b>React-router</b> sera el encargado del enrutamiento de paginas. (https://reactrouter.com/en/main)
<br/><br/>
- <b>Redux/toolkit</b> para manejar estados de componente y diferentes lógicas tanto síncronas como asíncronas. (https://redux-toolkit.js.org)
<br/><br/>
- <b>Axios</b> para manejar peticiones http, lo cual será útil para la comunicación con la API. (https://axios-http.com/docs/intro)
<br/><br/>
- <b>Formik</b> para manejar el estado y control de errores en los formularios. (https://formik.org)
<br/><br/>
- <b>Yup</b>  para generar los esquemas de validación de datos para cada formulario y trabajara en conjunto con <b>formik</b>. (https://www.npmjs.com/package/yup)
<br/><br/>
- <b>Material-ui</b> nos proporciona un conjunto de componentes ya diseñados para utilizar en las diferentes plantillas. (https://mui.com)
<br/><br/>
- <b>Typedoc</b> para generar la documentación un HTML que tendrá la documentación del proyecto. (https://typedoc.org/guides/overview/)


# Estructura de carpetas
```text
+---api
|   +---core
|   \---seguridad
|       +---Ingresar
|       +---refrescar
|       \---register
+---assets
+---components
+---contexts
|   \---templateContext
+---layouts
+---pages
|   \---dashboard
+---redux
+---router
|   \---middlewares
+---services
\---templates
    +---interfaces
```

# Instalación

Sigue los siguientes pasos para instalar el proyecto:

1.  **Clonar el repositorio:**
     ```bash
     git clone <URL_DEL_REPOSITORIO>
    ```
1.  **Instalar todas las dependencias:**
        dentro de la carpeta del proyecto ejecutar
    ```bash
    npm install
    ```
 1.  **Correr el servidor de desarrollo:**
        dentro de la carpeta del proyecto ejecutar
     ```bash
     npm run dev
     ```

# Otros comandos
- Para generar la documentación ejecutar:
esto crea una nueva carpeta llamada <b>docs</b> en la base del proyecto, dentro estara un index.html el cual se tendra que abrir en el navegador.
     ```bash
     npm run generate-doc
     ```
