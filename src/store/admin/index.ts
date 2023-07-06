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

    })
})
export default slice.reducer