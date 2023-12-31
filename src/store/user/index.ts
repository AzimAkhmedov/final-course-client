import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IAuthProps, ILoginProps, IUserReducer } from "../../types"
import { toast } from 'react-toastify'
import api from "../../shared/api"
import jwtDecode from "jwt-decode"
import { error } from "console"

const initialState: IUserReducer = {
    // @ts-ignore
    username: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')).username : "",
    role: "User",
    token: "",
    adminToken: "",
    loader: false,
    isAuth: localStorage.getItem('token') ? true : false
}
export const Registration = createAsyncThunk('Registration', async (user: IAuthProps, __thunkAPI) => {
    try {
        const res = await api.registration(user)
        if (res.data.token) {
            toast('Welcome ' + user.username, { type: "success" })
            localStorage.setItem('token', res.data.token)
        }
        return { user, data: res.data }
    } catch (error) {
        toast('Registration error ', { type: "error" })
        return __thunkAPI.rejectWithValue(error)
    }
})
export const isAdmin = createAsyncThunk('isAdmin', async (arg: any) => {
    const { data } = await api.isAdmin(arg)
    if (data.token) {
        localStorage.setItem('admin', data.token)
    }
    return data
})
export const Login = createAsyncThunk('Login', async (user: ILoginProps, __thunkAPI) => {
    try {
        const { data } = await api.login(user)
        if (data.token) {
            localStorage.setItem('token', data.token)
        } else {
            toast(data.message)
        }
        return { data, user }
    } catch (e) {
        return __thunkAPI.rejectWithValue(e)
    }
})
const userSlice = createSlice({
    initialState, name: "user", reducers: {
        getToken(state, action) {
            state.isAuth = true
            state.token = action.payload
            const obj: any = jwtDecode(action.payload)
            state.username = obj.username

        },
        getAdminToken(state, action) {
            state.role = 'Admin'
            state.adminToken = action.payload
        },
        logOut(state) {
            state.isAuth = false
            state.token = ""
            state.role = 'User'
            state.adminToken = ''
        }
    }, extraReducers: (builder) => {
        builder.addCase(Registration.fulfilled, (state, action) => {
            state.token = action.payload.data.token
            state.isAuth = true
            state.loader = false
            state.username = action.payload.user.username
        })
        builder.addCase(Registration.pending, (state, action) => {
            state.loader = true
        })
        builder.addCase(Login.pending, (state) => {
            state.loader = true
        })
        builder.addCase(Login.fulfilled, (state, action) => {
            state.token = action.payload.data.token
            state.isAuth = true
            state.loader = false
            state.username = action.payload.user.username
        })
        builder.addCase(Login.rejected, (state) => {
            state.loader = false
        })
        builder.addCase(isAdmin.fulfilled, (state, action) => {
            state.role = action.payload.isAdmin ? "Admin" : "User"
            state.adminToken = action.payload.token
        })
    }
})


export const { getToken, logOut, getAdminToken } = userSlice.actions
export default userSlice.reducer