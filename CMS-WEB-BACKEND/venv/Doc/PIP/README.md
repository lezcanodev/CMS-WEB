1. Crear un entorno virtual para evitar conflictos con demas paquetes

    ```
	python -m venv venv

    ```
	
2. Inicializar el entorno virtual 

    ```
	.\venv\Scripts\activate
    ```
	
3. Instalar el paquete de apache-superset

    ```
	pip install apache-superset
    ```
	
4. Configurar la variable de entorno superset

    ```
	set FLASK_APP=superset
    ```
	
5. Crear un archivo superset_config.py

6. Agregar una secket-key corriendo el comando:

    ```
	openssl rand -base64 42
    ```

7. Copiar la llave secreta generada en superset_config.py
    
	```
	SECRET_KEY = 'random secket key'
    ```
	
8. Configurar la ruta del superset_config.py
    
	```
	set SUPERSET_CONFIG_PATH=C:\ruta\de\tu\superset_config.py
    ```
	
9. Inicializar la base de datos de superset donde se guardaran los dashboard y charts
    
	```
	superset db upgrade
    ```
	
10. Crear un usuario administrador y rellenar los datos

    ```
	superset fab create-admin
    ```
	
11. Inicializar los componentes necesarios para superset
    
	```
	superset init
    ```
	
12. Correr el servidor de apache-superset en localhost en el puerto 8088

    ```
	superset run -p 8088 --with-threads --reload
    ```
	
13. Abrir en el navegador en host donde esta corriendo el superset

    ```
    127.0.0.1:8088
    ```

14. Seleccionar el boton + en la parte superior derecha, y seleccionar Data->Connect Database->{Tu_Sistema_De_Gestion_De_base_de_datos}
(en nuestro caso->PostgreSQL) completar los datos de la bd o podria desplazar el menu hacia abajo y seleccionar SQLAlchemy URL
y pegar la url correspodiente

15. Crear un dataset
    -Opcion1: Seleccionar una tabla especifica
    -Opcion2: Usar SQL Lab para relacionar tablas y personalizar la consulta

16. Crear graficos y luego colocarlos en un dashboard

17. Modificar Permisos y roles para que los graficos sean publicos y no requieran credenciales
    - Seleccionamos settings->List roles 

    -En caso que el role Public no contenga ningun permiso, se elimina dicho rol y se realiza una copia del role Gamma(rol por defecto con varios permisos)
	una vez se haya copiado el rol Gamma, se debe cambiar el nombre a Public

18. En el dashboard elegido para usar en su pagina, seleccionar share->copy permalink to clipboard, el link copiado debera pegar en un su elemento HTML iframe. Ejemplo:

    ```
    <iframe
    width="1200"
    height="600"
    seamless
    src={Link copiado sin las llaves}>
    </iframe>
    ```
