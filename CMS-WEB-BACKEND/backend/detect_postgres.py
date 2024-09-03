import time
import psycopg2

"""
Función para detectar si el servidor de postgres ya esta en curso para evitar
que la api intente conectarse antes de que postgres haya inicializado
"""
def check_postgres():
    try:
        # Intentar conectar a la base de datos usando los parámetros de settings
        conn = psycopg2.connect(
            dbname='Django',
            user='postgres',
            password='root',
            host='database',
            port=5432
        )
        conn.close()
        return True
    except psycopg2.OperationalError:
        return False

def main():
    print("Checking PostgreSQL...")
    while not check_postgres():
        print("PostgreSQL is not available. Retrying in 5 seconds...")
        time.sleep(5)
    print("PostgreSQL is up and running!")

if __name__ == "__main__":
    main()