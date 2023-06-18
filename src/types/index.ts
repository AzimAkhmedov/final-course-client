export interface IUserReducer {
    username: string
    role: 'Admin' | 'User'
    token: string
    isAuth: boolean
    loader: boolean
}
export interface IAppReducer {
    lang: 'Ru' | 'En'
    darkMode: boolean
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
export interface ICollection {
    username: string
    collectionName: string
    params: any[]
}
export interface IItem {
    username: string
    collectionName: string
    params: any
}
export interface ICollectionState {
    collections: Array<ICollection>
    collectionParams: Array<any>
    loading: boolean
    error: boolean | string
    currentCollection: Array<IItem>
}