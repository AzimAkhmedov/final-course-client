import axios from "axios"
// https://finall-task.onrender.com/
const baseURL = 'https://finall-task.onrender.com/'

export const instance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
})
