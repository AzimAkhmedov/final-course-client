export interface IUserReducer {
    username: string
    role: 'Admin' | 'User'
    adminToken: string
    token: string
    isAuth: boolean
    loader: boolean
}
interface ISearchResult {
    resultItemNames: Array<IItem>
    resultItemParams: Array<IItem>
    resultCollectionNames: Array<ICollection>
    resultCommentMessages: Array<IComment>
}
export interface IAppReducer {
    lang: 'Ru' | 'En'
    darkMode: boolean
    loading: boolean
    error: boolean
    adminSidebar: boolean
    searchResult: ISearchResult
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
    imgUrl?: string
}
export interface IItem {
    itemName: string
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
    largestCollections: Array<ICollection>
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
export interface IUser {
    username: string
    password: string
    role: 'User' | 'Admin'
    status: "Banned" | "Not-Banned"
    _id?: string
}
export interface IAdminState {
    allCollections: Array<ICollection>
    allUsers: Array<IUser>
    allItems: Array<IItem>
    admins: Array<IUser>
    token: string
    loading: boolean
    error: boolean
}