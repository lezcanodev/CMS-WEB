

export interface IInicioPage{
    title: string,
    goToLogin: () => void,
    goToRegister: () => void,
    goToDashboard: () => void, 
    logout: () => void,
    auth: {
        isAuth: boolean,
        userData: {
            username: string
        } | null
    }
}