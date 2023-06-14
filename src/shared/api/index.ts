import { IAuthProps, ILoginProps } from "../../types"
import { instance } from "./instance"

const api = {
    async registration(user: IAuthProps) {
        return instance.post('auth/registration', user).then(res => res)
    },

    async login(user: ILoginProps) {
        return await instance.post('auth/login', user).then((res) => res)
    }
    ,
    async getUsers() {
        return await instance.get('auth/users').then((res) => res)
    }
}

export default api