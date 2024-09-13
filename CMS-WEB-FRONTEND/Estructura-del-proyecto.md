## Estructura de carpetas

# Api
- Esta carpeta contendrá todas la lógica y control de peticiones al backend.
- Para crear un nuevo recurso que se comunicara con el backend hacer:
    - Crear una carpeta con un nombre que represente de forma general
            todas las comunicaciones que se harán al backend.<br/>
            ejemplo: la carpeta <b>"seguridad"</b> contiene login, register, refresh token, etc.
            o para crear el ABM de categoría crear un carpeta llamada categoría.
    - Crear una carpeta por cada método que tenga el recurso, no englobar todo en un mismo
            archivo. <br/>
            ejemplo: para el ABM de categoría debería haber un carpeta para crear, eliminar, listar, actualizar, etc.
    - Dentro de la carpeta de los métodos hay principalmente 3 archivos, que son:
        - <b>[nombreMetodo].model.ts</b> Este archivo debe definir principalmente dos interfaces una
                    que representa la estructura de datos de solicitud al backend y otra para la respuesta, no
                    agregar nada que no contemple el backend.<br/>
                    ejemplo: para la endpoint /token que es la que hace login, sus 2 interfaces serian:
        ```typescript
            // Estructura de solicitud
            export interface LoginRequest{
                username: string,
                password: string;
            }
            // estructura de respuesta
            interface LoginResponse{
                token: string,
                refresh: string;
            }
        ```
        - <b>[nombreMetodo].api.ts</b> Este archivo contendrá la lógica para la comunicación con la API, contiene una clase que tiene la nomenclatura Api[nombreMetodo], luego esta clase debe extender de <b>base.api.ts</b> que es un genérico
        que proporcionara un control de errores comunes y métodos comunes que necesitaran los distintos recursos. Aquí
        se usara lo definido en <b>[nombreMetodo].model.ts</b><nr/>ejemplo:
        ```typescript
            // Sirve para definir las decencias que tendrá la clase
            interface ApiIngresarParams{
                readonly localStorage: LocalStorageServices
            }
            class ApiIngresar extends Api<LoginRequest, LoginResponse>{

                constructor(
                    private readonly params: ApiIngresarParams
                ){
                    super();
                }
                // handle es un método abstracto que viene de las clase Api y se debe definir por cada recurso,
                // el try-catch solo es necesario si se manejara un error no común 
                // este método debe utilizar el método this.data para retornar los datos, el cual recibe dos parámetros
                // uno que sera la respuesta response.data y el otro son datos extras que no vienen en la respuesta
                // pero se necesitaran
                protected async handle(datos: LoginRequest){
                    try{
                        const response = await this.api.post<LoginResponse>('token/', datos);
                        const data = response.data;

                        this.params.localStorage.set('token', data.token);
                        this.params.localStorage.set('refresh', data.refresh);

                        return this.data<UserData>(response.data, {
                            username: datos.username
                        });

                    }catch(error){

                        if(error instanceof AxiosError){
                            if(error.status == 401){
                                this.error(Api.HttpStatusCode.Unauthorized('Credenciales incorrectas'));
                            }
                        }

                        throw error;
                    }
                }
            }
        ```
        - <b>[nombreMetodo].thunk.ts</b> Este archivo utiliza redux para encapsular nuestra api creada anteriormente
        y posteriormente poder manejar los estados en los componentes y paginas del GUI a partir del método.
        ```typescript
            /**
            * Creamos una instancia y inyectamos todas las dependencias necesarias
            */
            const seguridadApi = new ApiIngresar({
                localStorage: localStorageServices
            });

            /**
            * Se encarga de manejar el estado para la request de ingresar, es decir
            * mantiene un estado para saber si la request esta en curso y cuando finaliza
            * guarda la respuesta en el estado, etc.
            *
            * baseApiThunk es un método base que se encarga de manejar operaciones comunes entre todas
            * las apis no es obligatorio usarla solo es un auxiliar.
            *
            * 'seguridad/ingresar' este nombre debe ser único, se usara la nomenclatura '[nombreGeneral]/[nombreMetodo]' 
            */
            export const seguridadIngresarThunk = createAsyncThunk(
                'seguridad/ingresar', baseApiThunk<LoginRequest>( async (loginData) => await seguridadApi.execute(loginData))
            )
        ```

    - Una vez finalizado la implementación del método