import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAdminState } from "../../types";
import api from "../../shared/api";
const initialState: IAdminState = {
    allUsers: [],
    allCollections: [],
    token: "",
    allItems: [],
    admins: [],

    loading: false,
    error: false
}
export const getAllUsers = createAsyncThunk('getAllUsers', async (_, thunkApi) => {
    try {
        const { data } = await api.getAllUsers()
        return data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})
export const getAllCollections = createAsyncThunk('getAllCollections', async (_, thunkAPI) => {
    try {
        const { data } = await api.getAllCollections()
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const adminDeleteCollection = createAsyncThunk('adminDeleteCollection', async (arg: any, thunkAPI) => {
    try {
        const { data } = await api.adminDeleteCollection(arg._id, arg.token)
        return arg._id
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const deleteUser = createAsyncThunk('deleteUser', async (arg: any) => {
    const { data } = await api.deleteUser(arg.id, arg.token)
    return arg.id
})
const slice = createSlice({
    name: "admin", initialState, reducers: {}, extraReducers: (builder => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllUsers.rejected, (state) => {
            state.loading = false
            state.error = true
        })
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.allUsers = action.payload
            state.loading = false
        })
        builder.addCase(getAllCollections.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllCollections.fulfilled, (state, action) => {
            state.allCollections = action.payload
            state.loading = false
        })
        builder.addCase(getAllCollections.rejected, (state) => {
            state.error = true
            state.loading = false
        })
        builder.addCase(adminDeleteCollection.pending, (state) => {
            state.loading = true
        })
        builder.addCase(adminDeleteCollection.fulfilled, (state, action) => {
            state.allCollections = state.allCollections.filter(e => e._id !== action.payload)
            state.loading = false
        })
        builder.addCase(adminDeleteCollection.rejected, (state) => {
            state.error = true
            state.loading = false
        })
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.allUsers = state.allUsers.filter(e => e.username !== action.payload)
        })
    })
})
export default slice.reducer