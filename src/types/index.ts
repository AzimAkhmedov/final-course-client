export interface IUserReducer {
    username: string
    role: 'Admin' | 'User'
    token: string
    isAuth: boolean
}
export interface IAuthProps {
    username: string
    password: string
    role: 'Admin' | 'User'
}