import { IAuthProps, ICollection, IComment, IItem, ILoginProps } from "../../types"
import { instance } from "./instance"

const api = {
    async registration(user: IAuthProps) {
        return instance.post('auth/registration', user).then(res => res)
    },
    async login(user: ILoginProps) {
        return await instance.post('auth/login', user).then((res) => res)
    },
    async tokenCheck() {

    },
    async getUsers() {
        return await instance.get('auth/users').then((res) => res)
    },
    async getUserCollection(username: string) {
        return await instance.get('collection/' + username).then(res => res)
    },
    async createNewCollection(collection: ICollection) {
        return await instance.post('collection/', collection).then(res => res)
    },
    async deleteCollection(_id: string) {
        return await instance.delete('collection/delete/' + _id).then(res => res)
    },
    async addToCollection(item: IItem) {
        return await instance.post('collection/add', item).then(res => res)
    },
    async getCurrentCollection(username: string, collection: string) {
        return await instance.get('collection/usercollection/' + username + "/" + collection).then(res => res)
    },
    async getCollectionParams(username: string, collection: string) {
        console.log(username + "/" + collection);

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
    //  username, collectionName, itemId, authorName, comment 
    async writeComment(arg: IComment) {
        return await instance.post('/items/comments/create', arg).then(res => res)
    },
    async getLikes(itemId: string) {
        return await instance.get('/items/likes/' + itemId).then(res => res)
    }



}

export default api