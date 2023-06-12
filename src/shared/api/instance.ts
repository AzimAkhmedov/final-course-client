import axios from "axios"

const baseURL = ''

export const instance = axios.create({
    baseURL
})
