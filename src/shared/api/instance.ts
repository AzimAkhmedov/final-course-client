import axios from "axios"
// https://finall-task.onrender.com/
const baseURL = 'http://localhost:5000'

export const instance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
})
