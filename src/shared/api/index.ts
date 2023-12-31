import axios from "axios"
import { IAuthProps, IComment, IItem, ILike, ILoginProps, ITheme } from "../../types"
import { instance } from "./instance"

const api = {
    async registration(user: IAuthProps) {
        return instance.post('auth/registration', user).then(res => res)
    },
    async login(user: ILoginProps) {
        return await instance.post('auth/login', user).then((res) => res)
    },

    async isAdmin(argv: any) {
        return await instance.post('admin/', argv).then(res => res)
    },
    async getUsers() {
        return await instance.get('auth/users').then((res) => res)
    },
    async getUserCollection(username: string) {
        return await instance.get('collection/user/' + username).then(res => res)
    },
    async getCollectionById(_id?: string) {
        return await instance.get('collection/current/' + _id).then(res => res)

    },
    async createNewCollection(collection: any) {
        return await axios.post('https://finall-task.onrender.com/upload', collection, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(res => res.data)
    },
    async deleteCollection(_id: string) {
        return await instance.delete('collection/delete/' + _id).then(res => res)
    },
    async addToCollection(item: IItem) {
        return await instance.post('collection/add/', item).then(res => res)
    },
    async getCurrentCollection(username: string, collection: string) {
        return await instance.get('collection/usercollection/' + username + "/" + collection).then(res => res)
    },
    async getCollectionParams(username: string, collection: string) {

        return await instance.get('collection/params/' + username + "/" + collection).then(res => res)
    },
    async getLastCollections(page: number) {
        return await instance.get('collection/getpages/' + page).then(res => res)
    }, async getCollectionThemes() {
        return await instance.get('theme/').then(res => res)
    },
    async getNumberOfPages() {
        return (await instance.get('collection/pages/amount')).data
    },
    async getPagesByTheme(theme: string, page: number) {
        return await instance.get('collection/getgapes/' + page + "/" + theme).then(res => res)
    },
    async deleteFromCollection(id: string) {
        return await instance.delete('/collection/item/' + id).then(res => res)
    },
    async getCurrentItem(id: string) {
        return await instance.get('/items/get/' + id).then(res => res)
    },
    async getTags() {
        return await instance.get('/collection/tags/item').then(res => res)
    },
    async getComments(_id: string) {
        return await instance.get('/items/comments/get/' + _id).then(res => res)
    },
    async writeComment(arg: IComment) {
        return await instance.post('/items/comments/create', arg).then(res => res)
    },
    async getLikes(itemId: string) {
        return await instance.get('/items/likes/' + itemId).then(res => res)
    },
    async isLiked(itemId: string, wholikes: string) {
        return await instance.get('/items/likes/' + itemId + '/' + wholikes).then(res => res)
    },
    async pressLike(like: ILike) {
        return await instance.post('/items/likes', like).then(res => res)
    },
    async getLargestFive() {
        return await instance.get('collection/largest/mostFive/').then(res => res)
    },
    async createAdmin(arg: any) {
        return await instance.put('admin/create', arg).then(res => res)
    },
    async deleteAdmin(id: string, token: string) {
        return await instance.delete("admin/removeFromAdmin/" + id + "/" + token).then(res => res)
    },
    async getAllUsers() {
        return await instance.get('auth/users').then(res => res)
    },
    async getAllCollections() {
        return await instance.get('admin/collections/').then(res => res)
    },
    async getCollectionPages() {
        return await instance.get('admin/collections/amount/').then(res => res)
    },
    async updateItem(arg: IItem) {
        return await instance.put('items/update', arg).then(res => res)
    },
    async adminDeleteCollection(_id?: string, token?: string) {
        return await instance.delete('admin/collections/delete/' + _id + '/' + token).then(res => res)
    },
    async deleteUser(_id: string, token: string) {
        return await instance.delete('admin/deleteUser/' + _id + "/" + token).then(res => res)
    },
    async setStatus(arg: any) {
        return await instance.put('admin/users/setStatus', arg).then(res => res)
    },
    async getAllItems(token: string) {
        return await instance.get('admin/item/' + token).then(res => res)
    },
    async search(text: string) {
        return await instance.get('search/' + text).then(res => res)
    },
    async createTheme(theme: ITheme) {
        return await instance.post('theme/', theme).then(res => res)
    },
    async getCollectionImg(username: string, collection: string) {
        return await instance.get('collection/img/' + username + "/" + collection).then(res => res.data)
    }
}

export default api