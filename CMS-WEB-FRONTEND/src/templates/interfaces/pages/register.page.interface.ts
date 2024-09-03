import { BaseResponse } from '@/api/core/base.api.model'
import { InputProps } from '../common/Input'

export interface IRegisterPage{
    onSubmitRegister:  () => void,
    goToLogin: () => void,
    stateSubmit: {
        loading: boolean,
        error: BaseResponse<any>['error']
    },
    inputs: {
        username: InputProps,
        password: InputProps
    }
}