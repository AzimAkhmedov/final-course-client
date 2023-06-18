import { IAuthProps, ICollection, IItem, ILoginProps } from "../../types"
import { instance } from "./instance"

const api = {
    async registration(user: IAuthProps) {
        return instance.post('auth/registration', user).then(res => res)
    },
    async login(user: ILoginProps) {
        return await instance.post('auth/login', user).then((res) => res)
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
    async deleteCollection(username: string, collection: string) {
        return await instance.delete('collection/' + username + "/" + collection).then(res => res)
    },
    async addToCollection(item: IItem) {
        return await instance.post('collection/add', item).then(res => res)
    },
    async getCurrentCollection(username: string, collection: string) {
        return await instance.get('collection/' + username + "/" + collection).then(res => res)
    },
    async getCollectionParams(username: string, collection: string) {
        return await instance.get('collection/params/' + username + "/" + collection).then(res => res)
    }
}

export default api