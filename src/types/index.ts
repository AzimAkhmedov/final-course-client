export interface IUserReducer {
    username: string
    role: 'Admin' | 'User'
    token: string
    isAuth: boolean
    loader: boolean
}
export interface IAuthProps {
    username: string
    password: string
    role: 'Admin' | 'User'
}
export interface ILoginProps {
    username: string
    password: string
}