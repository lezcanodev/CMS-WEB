import sqlite3

conexion = sqlite3.connect('superset.db')

conexion.commit()
conexion.close()