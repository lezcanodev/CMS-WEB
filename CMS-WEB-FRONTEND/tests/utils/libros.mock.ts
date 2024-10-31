

export const MOCK_LIBROS = [
  {
    "id": 2,
    "titulo": "LIBRO_ Guardado",
    "fecha": "2024-10-18T16:38:37.324064Z",
    "author": 2,
    "categoria": 1,
    "estado": "Guardado",
    "contenido": "<p>sdsdsds</p>",
    "categoriaNombre": "CTG1",
    "autorNombre": "admin2"
  },
  {
    "id": 3,
    "titulo": "LIBRO_ En Revision",
    "fecha": "2024-10-18T16:38:37.324064Z",
    "author": 2,
    "categoria": 1,
    "estado": "En Revision",
    "contenido": "<p>sdsdsds</p>",
    "categoriaNombre": "CTG1",
    "autorNombre": "admin2"
  },
  {
    "id": 4,
    "titulo": "LIBRO_ Rechazado",
    "fecha": "2024-10-18T16:38:37.324064Z",
    "author": 2,
    "categoria": 1,
    "estado": "Rechazado",
    "contenido": "<p>sdsdsds</p>",
    "categoriaNombre": "CTG1",
    "autorNombre": "admin2"
  },
  {
    "id": 5,
    "titulo": "LIBRO_ Publicado",
    "fecha": "2024-10-18T16:38:37.324064Z",
    "author": 2,
    "categoria": 1,
    "estado": "Publicado",
    "contenido": "<p>sdsdsds</p>",
    "categoriaNombre": "CTG1",
    "autorNombre": "admin2"
  }
]

export function mockLibros(){
    return {
        mockLibros: MOCK_LIBROS,
        cantidad: MOCK_LIBROS.length,
        cantidadGuardados: 1,
        cantidadEnRevision: 1,
        cantidadPublicados: 1,
        cantidadRechazados: 1,
    }
}