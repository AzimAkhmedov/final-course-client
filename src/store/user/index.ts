import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IAuthProps, IUserReducer } from "../../types"
import { toast } from 'react-toastify'
import api from "../../shared/api"

const initialState: IUserReducer = {
    username: "",
    role: "User",
    token: "",
    isAuth: false
}
export const Registration = createAsyncThunk('Registration', async (user: IAuthProps, __thunkAPI) => {
    try {
        const res = await api.registration(user)
        console.log(res.data);

        if (res.data) {
            toast('Welcome ' + user.username, { type: "success" })
        }
        return { user, data: res.data }
    } catch (error) {
        toast('Registration error ', { type: "error" })
        return __thunkAPI.rejectWithValue(error)
    }
})
const userSlice = createSlice({
    initialState, name: "user", reducers: {

    }, extraReducers: (builder) => {
        builder.addCase(Registration.fulfilled, (state, action) => {
            // @ts-ignore
            state.token = action.payload.user.username
        })
    }
})


export const { } = userSlice.actions
export default userSlice.reducer