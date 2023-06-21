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
    _id?: string
    username: string
    collectionName: string
    params: any[]
    description: string
}
export interface IItem {
    username: string
    collectionName: string
    params: any
}

export interface ITheme {
    theme: string
    themeRu: string
}
export interface ICollectionState {
    collections: Array<ICollection>
    collectionParams: Array<any>
    loading: boolean
    error: boolean | string
    currentCollection: Array<IItem>
    lastCollections: Array<ICollection>
    themes: Array<ITheme>
}
export interface IItem {
    username: string
    collectionName: string
    param: Object
    itemName: string
}
export interface IComment {
    username: string
    collectionName: string
    itemId: string
    authorName: string
    comment: string
    time: string
}
export interface ILike {
    username: string
    collectionName: string
    itemId: string
    wholikes: string
}
export interface IItemState {
    items: Array<IItem>
    likes: Array<ILike>
    comments: Array<IComment>
    itemsLoader: boolean
    error: boolean | string
}