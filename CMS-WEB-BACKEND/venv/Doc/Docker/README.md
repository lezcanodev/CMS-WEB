1. Clonar repositorio de apache-Superset

    ```
    git clone https://github.com/apache/superset.git depth 1
    ```

2. Construccion de la imagen del superset
    ```
    docker build -t NombreParalaImagen .
    ```

3. Inicio del contenedor donde esta alojado superset

    ```
    docker compose -f docker-compose-non-dev.yml up
    ```

4. Si se necesita agregar alguna configuracion extra podes modificar el archivo superset_config.py que se encuentra en: 

    ```
    cd docker/pythonpath_dev/
    ```

5. Desactivar examples por defecto de superset en el archivo /docker/.env, cambiar 'yes' por 'no'

    ```
    SUPERSET_LOAD_EXAMPLES=yes

    ```

6. Abrir en el navegador en host donde esta corriendo el superset

    ```
    127.0.0.1:8088
    ```

7. Seleccionar el boton + en la parte superior derecha, y seleccionar Data->Connect Database->{Tu_Sistema_De_Gestion_De_base_de_datos}
(en nuestro caso->PostgreSQL) completar los datos de la bd o podria desplazar el menu hacia abajo y seleccionar SQLAlchemy URL
y pegar la url correspodiente

8. Crear un dataset
    -Opcion1: Seleccionar una tabla especifica
    -Opcion2: Usar SQL Lab para relacionar tablas y personalizar la consulta

9. Crear graficos y luego colocarlos en un dashboard

10. Modificar Permisos y roles para que los graficos sean publicos y no requieran credenciales
    - Seleccionamos settings->List roles 

    -En caso que el role Public no contenga ningun permiso, se elimina dicho rol y se realiza una copia del role Gamma(rol por      defecto con varios permisos) una vez se haya copiado el rol Gamma, se debe cambiar el nombre a Public

11. En el dashboard elegido para usar en su pagina, seleccionar share->copy permalink to clipboard, el link copiado debera pegar en un su elemento HTML iframe. Ejemplo:

    ```
    <iframe
    width="1200"
    height="600"
    seamless
    src={Link copiado sin las llaves}>
    </iframe>
    ```

