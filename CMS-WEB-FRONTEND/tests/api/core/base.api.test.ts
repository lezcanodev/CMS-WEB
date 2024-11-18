import Api from '@/api/core/base.api';
import { BaseResponse } from '@/api/core/base.api.model';
import { workerFakeApi } from '@tests/utils/server.fake';
import { http, HttpResponse } from 'msw';
import { afterEach, describe, expect, it } from 'vitest';


export const FAKE_ENDPOINT = 'http://127.0.0.1:8000/fake-endpoint'

/**
 * Clase que hace una solicitud a una endpoint que no existe
 * para probar que la clase abstracta Api maneja correctamente
 * los casos considerados
 */
class FakeEndpoint extends Api<any, any>{

    protected async handle(data: any): Promise<BaseResponse<any, any>> {
        const dataResponse = await this.api.get(FAKE_ENDPOINT);
        return this.data(dataResponse.data);
    }
}

describe('Core - Api Base', async () => {

    afterEach(() => {
        workerFakeApi.resetHandlers();
    })

    /**
     * Verificamos que el access token sea enviado siempre en la request en 
     * caso de existir
     */
    it('Debería agregar el token a la request', async () => {
        // fake token access
        const tokenAccess = 'FAKE_TOKEN_ACCESS';
        // guardamos en local storage
        localStorage.setItem('token', tokenAccess);
        // para almacenar el valor del header authorization al hacer la solicitud
        let headerRequestAuthorization: string | null = null;

        // Interceptamos la request para verificar si el access token va con ella
        workerFakeApi.use(
            http.get(FAKE_ENDPOINT, ({request: req}) => {
                // Guaramos al Authorization header en la variable
                headerRequestAuthorization = req.headers.get('Authorization');
                return HttpResponse.json({}, {status: 200});
            })
        );

        // hacemos la solicitud
        const fakeApi = new FakeEndpoint();
        await  fakeApi.execute({});
        
        // Verificamos que el access token sea correcto
        expect(headerRequestAuthorization, 'El access token es incorrecto').toBe(`Bearer ${tokenAccess}`);

        // removemos el access token
        localStorage.removeItem('token');
    })

    /**
     * Verificamos que lance un error personalizado correctamente
     */
    it('Debería lanzar un error personalizado correctamente', async () => {
        // Datos falsos
        const mockHttpCode = 500;
        const mockMensajeError = 'MOCK_MENSAJE_ERROR';
        const mockFieldErrorName = 'MICK_FIELD_ERROR_NAME';

        /**
         * Clase que lanza un error de tipo ApiErrorRequest
         */
        class FakeEndpointThrowApiError extends Api<any, any>{
            protected async handle(data: any): Promise<BaseResponse<any, any>> {
                // retornamos el error personalizado
                return this.error({httpCode: mockHttpCode, [mockFieldErrorName]: mockMensajeError });
            }
        }

        // hacemos la solicitud
        const data = await (new FakeEndpointThrowApiError()).execute({});

        // Verificamos que el resultado sea el esperado
        expect(data.data, 'Los datos no deberían estar definidos cuando la solicitud salio mal').toBeUndefined();
        expect(data.error, 'Error debería estar definido cuando la solicitud salio mal').toBeDefined();
        expect(data.error?.httpCode, `El código http en error debería ser ${mockHttpCode}`).toBe(mockHttpCode);
        expect(data.error?.[mockFieldErrorName], 'La key del error custom no esta definido').toBeDefined();
        expect(data.error?.[mockFieldErrorName], 'El mensaje de error es incorrecto').toBe(mockMensajeError);
    })

    /***
     * HTTP STATUS 200 OK
     */
    it('Debería manejar correctamente HTTP STATUS 200', async  () => {
        const fakeResponseData = "FAKE_DATOS_RESPONSE";

        // Preparamos la respuesta para la prueba
        workerFakeApi.use(
            http.get(FAKE_ENDPOINT, () => {
              return HttpResponse.json(fakeResponseData, {status: 200}) ;
            })
        );

        // hacemos la solicitud
        const fakeApi = new FakeEndpoint();
        const data = await  fakeApi.execute({});

        // Verificamos que el resultado sea el esperado
        expect(data.data, 'Los datos son incorrectos').toBe(fakeResponseData);
        expect(data.error, 'No debería haber errores cuando la solicitud es correcta').toBeUndefined();
    })

    /***
    * HTTP STATUS 500 INTERNAL SERVER
    */
    it('Debería manejar correctamente HTTP STATUS 500', async  () => {
        // Preparamos la respuesta para la prueba
        workerFakeApi.use(
            http.get(FAKE_ENDPOINT, () => {
              return HttpResponse.json(null, {status: 500}) ;
            })
        );

        // hacemos la solicitud
        const fakeApi = new FakeEndpoint();
        const data = await  fakeApi.execute({});
                
        // Verificamos que el resultado sea el esperado
        expect(data.data, 'Los datos no deberían estar definidos cuando la solicitud salio mal').toBeUndefined();
        expect(data.error, 'Error debería estar definido cuando la solicitud salio mal').toBeDefined();
        expect(data.error?.httpCode, 'El código http en error debería ser 500').toBe(500);
        expect(data.error?.general, 'El mensaje general por defecto de error es incorrecto').toBe('Ocurrió un error, inténtalo mas tarde');
    })

    /***
    * HTTP STATUS 400 BAD REQUEST
    */
    it('Debería manejar correctamente HTTP STATUS 400', async  () => {
        // Preparamos la respuesta para la prueba
        workerFakeApi.use(
            http.get(FAKE_ENDPOINT, () => {
              return HttpResponse.json(null, {status: 400}) ;
            })
        );

        // hacemos la solicitud
        const fakeApi = new FakeEndpoint();
        const data = await  fakeApi.execute({});

        // Verificamos que el resultado sea el esperado
        expect(data.data, 'Los datos no deberían estar definidos cuando la solicitud salio mal').toBeUndefined();
        expect(data.error, 'Error debería estar definido cuando la solicitud salio mal').toBeDefined();
        expect(data.error?.httpCode, 'El código http en error debería ser 400').toBe(400);
        expect(data.error?.general, 'El mensaje general por defecto de error es incorrecto').toBe('Los datos son inválidos');
    })

    /***
    * HTTP STATUS 400 BAD REQUEST
    */
    it('Debería manejar correctamente HTTP STATUS 400 con campos específicos de error', async  () => {
        const mockCampoNombre = 'CAMPO_ESPECIFICO';
        const mockErrorMensaje = 'CAMPO_ESPECIFICO_MENSAJE';

        // Preparamos la respuesta para la prueba
        workerFakeApi.use(
            http.get(FAKE_ENDPOINT, () => {
              return HttpResponse.json( {
                [mockCampoNombre]: mockErrorMensaje
              }, {status: 400}) ;
            })
        );

        // hacemos la solicitud
        const fakeApi = new FakeEndpoint();
        const data = await  fakeApi.execute({});

        // Verificamos que el resultado sea el esperado
        expect(data.data, 'Los datos no deberían estar definidos cuando la solicitud salio mal').toBeUndefined();
        expect(data.error, 'Error debería estar definido cuando la solicitud salio mal').toBeDefined();
        expect(data.error?.httpCode, 'El código http en error debería ser 400').toBe(400);
        expect(data.error?.general, 'El mensaje general por defecto no debería estar definido').toBeUndefined();
        expect(data.error?.[mockCampoNombre], `El campo especifico de error "${mockCampoNombre}" debería estar definido`).toBeDefined();
        expect(data.error?.[mockCampoNombre], `El mensaje de error del campo especifico es incorrecto`).toBe(mockErrorMensaje);
    })

    /***
    * HTTP STATUS 401 UNAUTHORIZED
    */
    it('Debería manejar correctamente HTTP STATUS 401', async  () => {
        // Preparamos la respuesta para la prueba
        workerFakeApi.use(
            http.get(FAKE_ENDPOINT, () => {
              return HttpResponse.json(null, {status: 401}) ;
            })
        );

        // hacemos la solicitud
        const fakeApi = new FakeEndpoint();
        const data = await  fakeApi.execute({});

        // Verificamos que el resultado sea el esperado
        expect(data.data, 'Los datos no deberían estar definidos cuando la solicitud salio mal').toBeUndefined();
        expect(data.error, 'Error debería estar definido cuando la solicitud salio mal').toBeDefined();
        expect(data.error?.httpCode, 'El código http en error debería ser 401').toBe(401);
        expect(data.error?.general, 'El mensaje general por defecto de error es incorrecto').toBe('No tienes accesos a este recurso');
    })

    /***
    * Debería manejar cualquier error desconocido como un 500
    * */
    it('Debería manejar correctamente un error desconocido', async  () => {
        // Preparamos la respuesta para la prueba
        workerFakeApi.use(
            http.get(FAKE_ENDPOINT, () => {
              // retornamos un error desconocido
              throw new Error("ERROR DESCONOCIDO");
            })
        );

       // hacemos la solicitud
       const fakeApi = new FakeEndpoint();
       const data = await  fakeApi.execute({});

       // Verificamos que el resultado sea el esperado
       expect(data.data, 'Los datos no deberían estar definidos cuando la solicitud salio mal').toBeUndefined();
       expect(data.error, 'Error debería estar definido cuando la solicitud salio mal').toBeDefined();
       expect(data.error?.httpCode, 'El código http en error debería ser 500').toBe(500);
       expect(data.error?.general, 'El mensaje general por defecto de error es incorrecto').toBe('Ocurrió un error, inténtalo mas tarde');
    })

    /***
    * Debería manejar cualquier http status no conocido como un 500
    * */
    it('Debería manejar un HTTP Status no conocido como 500', async  () => {
        // Preparamos la respuesta para la prueba
        workerFakeApi.use(
            http.get(FAKE_ENDPOINT, () => {
              // retornamos un error desconocido
              return  HttpResponse.json({}, { status: 501})
            })
        );

       // hacemos la solicitud
       const fakeApi = new FakeEndpoint();
       const data = await  fakeApi.execute({});

       // Verificamos que el resultado sea el esperado
       expect(data.data, 'Los datos no deberían estar definidos cuando la solicitud salio mal').toBeUndefined();
       expect(data.error, 'Error debería estar definido cuando la solicitud salio mal').toBeDefined();
       expect(data.error?.httpCode, 'El código http en error debería ser 500').toBe(500);
       expect(data.error?.general, 'El mensaje general por defecto de error es incorrecto').toBe('Ocurrió un error, inténtalo mas tarde');
    })
})