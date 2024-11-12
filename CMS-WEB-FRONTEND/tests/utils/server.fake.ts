import {http, HttpResponse} from 'msw';
import { setupServer } from "msw/node";
import { LIBRO_ENDPOINTS, mockLibros } from './libros.mock';

const MOCK_REFRESH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczMDI0MzcyNCwiaWF0IjoxNzMwMTU3MzI0LCJqdGkiOiI1OWU1N2MzMzIzYzU0ZjFmYTI2NTNlYWYwNDNjMzdmOCIsInVzZXJfaWQiOjJ9.zwaXptgmmu7osIxM0GGAmTRWrJ3yZcYIzULnAj0G_6Y';
const MOCK_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTczMDI0MzcyNCwiaWF0IjoxNzMwMTU3MzI0LCJqdGkiOiI1OWU1N2MzMzIzYzU0ZjFmYTI2NTNlYWYwNDNjMzdmOCIsInVzZXJfaWQiOjJ9.zwaXptgmmu7osIxM0GGAmTRWrJ3yZcYIzULnAj0G_6Y';
const MOCK_TEST_ROLE = 'Administrador';
const MOCK_CATEGORIAS = [
  { "id": 1, "nombre": "Categoria uno" },
  { "id": 2, "nombre": "Categoria dos" },
  { "id": 3, "nombre": "Categoria tres" },
  { "id": 4, "nombre": "Categoria cuatro" }
]



/**
 * Aquí debería interceptar las solicitudes al backend y falsear las respuestas
*/
export const handlers = [
  /**
   * FAKE SEGURIDAD
   */
  http.post('http://127.0.0.1:8000/api/token/refresh/', () => {
    return HttpResponse.json({
        "access": MOCK_ACCESS_TOKEN
      }, {status: 200});
  }),

  http.post('http://127.0.0.1:8000/api/token/', () => {
    return HttpResponse.json({
      "refresh": MOCK_REFRESH_TOKEN,
      "access": MOCK_ACCESS_TOKEN,
      "role": MOCK_TEST_ROLE
    }, {status: 200});
  }),

  /***
   *  FAKE CATEGORÍAS ENDPOINTS
   */
  http.get('http://127.0.0.1:8000/api/listar-categoria', () => {
    return HttpResponse.json( MOCK_CATEGORIAS , {status: 200});
  }),

  http.post('http://127.0.0.1:8000/api/crear-categoria', async ({ request }) => {
    const bodyData: any = await request.json();
    const nuevaCategoria = {
      "id": 1,
      "nombre": bodyData?.nombre
    }
    MOCK_CATEGORIAS.push(nuevaCategoria)
    return HttpResponse.json(nuevaCategoria,{status: 201});
  }),
  
  /**
   * FAKE LIBROS ENDPOINTS
   */
  http.get(LIBRO_ENDPOINTS.listarLibros, () => HttpResponse.json(mockLibros().mockLibros, {status: 200}) ),

];


export const workerFakeApi = setupServer(...handlers)