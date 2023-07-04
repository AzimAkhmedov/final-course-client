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
    adminSidebar: boolean
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
    theme?: string
}
export interface IItem {
    _id?: string
    username: string
    collectionName: string
    params: any,
    tags: Array<string>

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
    lastCollections: Array<IItem>
    themes: Array<ITheme>
    tags: Array<ITags>
}
export interface IComment {
    username: string
    collectionName: string
    itemId: string
    authorName: string
    comment: string
    time?: string
}
export interface ITags {
    tag: string
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
    isLiked: boolean
    comments: Array<IComment>
    itemsLoader: boolean
    error: boolean | string
    currentItem: IItem
}