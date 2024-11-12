import { BaseResponse } from '@/api/core/base.api.model'
import { InputProps } from '../common/Input'

/**
 * Datos que debe recibir la pagina de login para que la plantilla utilizada la
 * pueda utilizar
 */
export interface ILoginPage{
    onSubmitLogin:  () => void,
    goToResetPassword: () => void,
    goToResetRegister: () => void,
    stateSubmit: {
        loading: boolean,
        error: BaseResponse<any>['error']
    },
    inputs: {
        username: InputProps,
        password: InputProps
    }
}