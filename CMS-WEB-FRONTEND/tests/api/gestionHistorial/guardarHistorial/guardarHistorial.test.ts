import {
    afterEach,
    describe,
    expect,
    it,
    vi
} from 'vitest';
import { http, HttpResponse } from 'msw';
import { workerFakeApi } from '@tests/utils/server.fake';
import ApiGuardarHistorialLibro from '@/api/gestionHistorial/guardarHistorial/guardarHistorial.api';
import { ApiGuardarHistorialLibroRequest } from '@/api/gestionHistorial/guardarHistorial/guardarHistorial.model';
import { HISTORIAL_ENDPOINTS } from '@tests/utils/historial.mock';
import ApiActualizarLibroEstado, { ApiActualizarLibro } from '@/api/gestionLibros/actualizar/actualizarLibro.api';
import ApiCrearLibro from '@/api/gestionLibros/crear/crearLibro.api';

describe('Api Guardar Historial Libro' , async  () => {

    afterEach(() => {
        workerFakeApi.resetHandlers();
    })

    /**
     * Verificamos que el envió de historial sea el correcto
     */
    it('Debería guardar correctamente el historial', async () => {
        const mockUserId = 1;

        // Creamos un fake de la clase UserUtils para probar el guardado de historial
        vi.mock('@/utils/User/User.utils', () => {
            const UserUtils = {
                getUser: vi.fn(() => ({ userId: 1 })),
            };
        
            return { UserUtils };
        });

        // Preparamos los datos falseados para la prueba
        const mockDatos: ApiGuardarHistorialLibroRequest = {
            libro: 1,
            accion: 'MOCK_ACCION'
        }
        let bodyRequest: any = {};

        // Interceptamos la request y capturamos el body
        // para verificar que los datos enviados son los esperados
        workerFakeApi.use(
            http.post(HISTORIAL_ENDPOINTS.guardarHistorial, async ({ request }) => {
                bodyRequest = await request.json();
                return HttpResponse.json({}, {status: 201}) ;
            })
        );

        // realizamos la solicitud de guardar
        const instance = new ApiGuardarHistorialLibro();
        await instance.execute(mockDatos)

        // Verificamos que los datos esperados hayan sido enviados correctamente
        expect(bodyRequest.libro, 'El id del libro enviado es incorrecto').toEqual(mockDatos.libro);
        expect(bodyRequest.accion, 'Descripción de la acción enviado es incorrecto').toEqual(mockDatos.accion);
        expect(bodyRequest.usuario, 'El id del usuario enviado es incorrecto').toEqual(mockUserId);
        expect(bodyRequest.fecha, 'La fecha no fue enviada').toBeDefined();
        expect(bodyRequest.fecha, 'La fecha debería tener un formato ISO').toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/);

    });


    /**
     * Verificamos que se llama a la endpoint de guardar historial
     * cuando un libro ha sido creado
     */
    it('Debería registrar el historial de un libro creado', async () => {
        // Hacemos un mock de execute de Api Guardar Historial Libro para verificar
        // que Api Actualizar Libro lo esta llamando correctamente
        const executeSpy = vi.spyOn(ApiGuardarHistorialLibro.prototype, 'execute').mockImplementation((data) => {
            return null!;
        });

        // falseamos la solicitud de creación de libro
        const mockLibroIdResultado = 1;
        workerFakeApi.use(
            http.post(`http://127.0.0.1:8000/api/crear-libro`, async ({ request }) => {
                return HttpResponse.json({
                    id: 1
                }, {status: 201}) ;
            })
        );

        // Creamos las instancias de los casos de uso
        const guardarInstance = new ApiGuardarHistorialLibro();
        const instance = new ApiCrearLibro(guardarInstance);

        // Ejecutamos ApiCrearLibro
        await instance.execute({
            titulo: "nuevo libro"
        } as any);

        // Verificamos que ApiCrearLibro haga la llamada correcta a ApiGuardarHistorialLibro con
        // los parámetros correctos
        expect(executeSpy).toHaveBeenCalledWith( {
            libro: mockLibroIdResultado,
            accion: 'Se ha creado el libro "nuevo libro"'
        });
    })

    /**
     * Verificamos que se llama a la endpoint de guardar historial
     * cuando un libro ha sido actualizado
     */
    it('Debería registrar el historial de un libro actualizado', async () => {
        // falseamos la solicitud de actualización de libro
        workerFakeApi.use(
            http.put(`http://127.0.0.1:8000/api/update-libro/1`, async ({ request }) => {
                return HttpResponse.json({}, {status: 201}) ;
            })
        );

        // Hacemos un mock de execute de Api Guardar Historial Libro para verificar
        // que Api Actualizar Libro lo esta llamando correctamente
        const executeSpy = vi.spyOn(ApiGuardarHistorialLibro.prototype, 'execute').mockImplementation((data) => {return null!;});

        // Creamos las instancias de los casos de uso
        const guardarInstance = new ApiGuardarHistorialLibro();
        const instance = new ApiActualizarLibro(guardarInstance);

        // Preparamos los datos falsos
        const mockDataLibro: any = {
            id: 1,
            
            // valores actualizados
            titulo: 'MOCK_TITULO_INICIAL',
            categoria: 1,
            contenido: 'CONTENIDO_INICIAL',
            nuevaCategoriaNombre: 'INICIAL',

            // valores antes de la actualización
            estadoAnterior: {
                titulo: 'MOCK_TITULO_NUEVO',
                contenido: 'CONTENIDO_CAMBIADO',
                categoria: 2,
                categoriaNombre: 'final'
            }
        } 

        // Ejecutamos ApiActualizarLibro
        await instance.execute(mockDataLibro);

        // Verificamos que ApiActualizarLibro haga la llamada correcta a ApiGuardarHistorialLibro con
        // los parámetros correctos
        expect(executeSpy).toHaveBeenCalledWith( {
            libro: 1,
            accion: "Titulo cambiado de \"MOCK_TITULO_NUEVO\" a \"MOCK_TITULO_INICIAL\"\\nCategoría cambiada de \"final\" a \"INICIAL\"\\nContenido se ha modificado, se ha removido -1 caracteres"
        });
    })

    /**
    * Verificamos que la diferencia de caracteres del contenido sea correcto,
    * probamos removiendo caracteres
    */
    it('Verificamos la cantidad de caracteres removidos al actualizar libro', async () => {
        // falseamos la solicitud de actualización de libro
        workerFakeApi.use(
            http.put(`http://127.0.0.1:8000/api/update-libro/1`, async ({ request }) => {
                return HttpResponse.json({}, {status: 201}) ;
            })
        );

        // Hacemos un mock de execute de Api Guardar Historial Libro para verificar
        // que Api Actualizar Libro lo esta llamando correctamente
        const executeSpy = vi.spyOn(ApiGuardarHistorialLibro.prototype, 'execute').mockImplementation((data) => {return null!;});

        // Creamos las instancias de los casos de uso
        const guardarInstance = new ApiGuardarHistorialLibro();
        const instance = new ApiActualizarLibro(guardarInstance);

        // Preparamos los datos falsos
        const mockDataLibro: any = {
            id: 1,
            // valores actualizados
            contenido: '123456',

            // valores antes de la actualización
            estadoAnterior: {
                contenido: '1234567'
            }
        } 

        // Ejecutamos ApiActualizarLibro
        await instance.execute(mockDataLibro);

        // Verificamos que ApiActualizarLibro haga la llamada correcta a ApiGuardarHistorialLibro con
        // los parámetros correctos
        expect(executeSpy).toHaveBeenCalledWith( {
            libro: 1,
            accion: "Contenido se ha modificado, se ha removido -1 caracteres"
        });
    })

    /**
    * Verificamos que la diferencia de caracteres del contenido sea correcto,
    * probamos agregando caracteres
    */
    it('Verificamos la cantidad de caracteres agregados al actualizar libro', async () => {
        // falseamos la solicitud de actualización de libro
        workerFakeApi.use(
            http.put(`http://127.0.0.1:8000/api/update-libro/1`, async ({ request }) => {
                return HttpResponse.json({}, {status: 201}) ;
            })
        );

        // Hacemos un mock de execute de Api Guardar Historial Libro para verificar
        // que Api Actualizar Libro lo esta llamando correctamente
        const executeSpy = vi.spyOn(ApiGuardarHistorialLibro.prototype, 'execute').mockImplementation((data) => {return null!;});

        // Creamos las instancias de los casos de uso
        const guardarInstance = new ApiGuardarHistorialLibro();
        const instance = new ApiActualizarLibro(guardarInstance);

        // Preparamos los datos falsos
        const mockDataLibro: any = {
            id: 1,
            // valores actualizados
            contenido: '123456789',

            // valores antes de la actualización
            estadoAnterior: {
                contenido: '123456'
            }
        } 

        // Ejecutamos ApiActualizarLibro
        await instance.execute(mockDataLibro);

        // Verificamos que ApiActualizarLibro haga la llamada correcta a ApiGuardarHistorialLibro con
        // los parámetros correctos
        expect(executeSpy).toHaveBeenCalledWith( {
            libro: 1,
            accion: "Contenido se ha modificado, se ha agregado +3 caracteres"
        });
    })

    
    /**
    * Verificamos que la diferencia de caracteres del contenido sea correcto,
    * probamos misma cantidad de caracteres
    */
    it('Verificamos la cantidad de caracteres sea la misma al actualizar libro', async () => {
        // falseamos la solicitud de actualización de libro
        workerFakeApi.use(
            http.put(`http://127.0.0.1:8000/api/update-libro/1`, async ({ request }) => {
                return HttpResponse.json({}, {status: 201}) ;
            })
        );

        // Hacemos un mock de execute de Api Guardar Historial Libro para verificar
        // que Api Actualizar Libro lo esta llamando correctamente
        const executeSpy = vi.spyOn(ApiGuardarHistorialLibro.prototype, 'execute').mockImplementation((data) => {return null!;});

        // Creamos las instancias de los casos de uso
        const guardarInstance = new ApiGuardarHistorialLibro();
        const instance = new ApiActualizarLibro(guardarInstance);

        // Preparamos los datos falsos
        const mockDataLibro: any = {
            id: 1,
            // valores actualizados
            contenido: '123456789',

            // valores antes de la actualización
            estadoAnterior: {
                contenido: '987654321'
            }
        } 

        // Ejecutamos ApiActualizarLibro
        await instance.execute(mockDataLibro);

        // Verificamos que ApiActualizarLibro haga la llamada correcta a ApiGuardarHistorialLibro con
        // los parámetros correctos
        expect(executeSpy).toHaveBeenCalledWith( {
            libro: 1,
            accion: "Contenido se ha modificado"
        });
    })

    /**
    * Verificamos que se registre que se realizo una actualizacion aunque no haya cambios
    */
    it('Verificamos que se haya registrado el evento actualizar aunque no haya cambios', async () => {
        // falseamos la solicitud de actualización de libro
        workerFakeApi.use(
            http.put(`http://127.0.0.1:8000/api/update-libro/1`, async ({ request }) => {
                return HttpResponse.json({}, {status: 201}) ;
            })
        );

        // Hacemos un mock de execute de Api Guardar Historial Libro para verificar
        // que Api Actualizar Libro lo esta llamando correctamente
        const executeSpy = vi.spyOn(ApiGuardarHistorialLibro.prototype, 'execute').mockImplementation((data) => {return null!;});

        // Creamos las instancias de los casos de uso
        const guardarInstance = new ApiGuardarHistorialLibro();
        const instance = new ApiActualizarLibro(guardarInstance);

        // Preparamos los datos falsos
        const mockDataLibro: any = {
            id: 1,
            // valores actualizados
            contenido: 'CONTENIDO',

            // valores antes de la actualización
            estadoAnterior: {
                contenido: 'CONTENIDO'
            }
        } 

        // Ejecutamos ApiActualizarLibro
        await instance.execute(mockDataLibro);

        // Verificamos que ApiActualizarLibro haga la llamada correcta a ApiGuardarHistorialLibro con
        // los parámetros correctos
        expect(executeSpy).toHaveBeenCalledWith( {
            libro: 1,
            accion: "Actualización realizada, pero sin cambios"
        });
    })

    /**
    * Verificamos que se llama a la endpoint de guardar historial
    * cuando un libro ha cambiado de estado
    */
    it('Debería registrar el historial del cambio de estado de un libro', async () => {
        // falseamos la solicitud de actualización de libro
        workerFakeApi.use(
            http.put(`http://127.0.0.1:8000/api/update-libro/1`, async ({ request }) => {
                return HttpResponse.json({}, {status: 201}) ;
            })
        );

        // Hacemos un mock de execute de Api Guardar Historial Libro para verificar
        // que Api Actualizar Libro Estado lo esta llamando correctamente
        const executeSpy = vi.spyOn(ApiGuardarHistorialLibro.prototype, 'execute').mockImplementation((data) => {return null!;});

        // Creamos las instancias de los casos de uso
        const guardarInstance = new ApiGuardarHistorialLibro();
        const instance = new ApiActualizarLibroEstado(guardarInstance);

        // Preparamos los datos falsos
        const mockDataLibro: any = {
            id: 1,
            
            // valores actualizados
            estado: "ESTADO_NUEVO",

            // valores antes de la actualización
            estadoAnterior: {
                estado: "ESTADO_ANTERIOR",
            }
        } 

        // Ejecutamos ApiActualizarLibroEstado
        await instance.execute(mockDataLibro);

        // Verificamos que ApiActualizarLibroEstado haga la llamada correcta a ApiGuardarHistorialLibro con
        // los parámetros correctos
        expect(executeSpy).toHaveBeenCalledWith( {
            libro: 1,
            accion: "Estado cambiado de \"ESTADO_ANTERIOR\" a \"ESTADO_NUEVO\""
        });
    })

})

