import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAdminState, IUser } from "../../types";
import api from "../../shared/api";
import { toast } from "react-toastify";
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
export const setStatus = createAsyncThunk("setStatus", async (user: any, thunkAPI) => {
    try {
        const { data } = await api.setStatus(user)
        return { data, user }
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getAllItems = createAsyncThunk('getAllItems', async (token: string) => {
    const { data } = await api.getAllItems(token)
    return data
})
export const deleteItem = createAsyncThunk('deleteItem', async (_id: string) => {
    const { data } = await api.deleteFromCollection(_id)
    return { data, _id }
})
export const createAdmin = createAsyncThunk('createAdmin', async (arg: any, thunkAPI) => {
    try {
        const { data } = await api.createAdmin(arg)
        return { data, username: arg.username }
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
export const deleteAdmin = createAsyncThunk('deleteAdmin', async (arg: any, thunkAPI) => {
    try {
        const { data } = await api.deleteAdmin(arg._id, arg.token)
        return { data, id: arg._id }
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
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
        builder.addCase(setStatus.fulfilled, (state, action) => {
            state.allUsers = state.allUsers.
                map(e => e._id != action.payload.user._id ? e :
                    { password: e.password, role: e.role, status: 'Banned', username: e.username, _id: e._id })
        })
        builder.addCase(getAllItems.fulfilled, (state, action) => {
            state.allItems = action.payload
        })
        builder.addCase(deleteItem.fulfilled, (state, action) => {
            state.allItems = state.allItems.filter(e => e._id !== action.payload._id)
        })
        builder.addCase(createAdmin.pending, (state) => {
            state.loading = true
        })
        builder.addCase(createAdmin.fulfilled, (state, action) => {
            state.allUsers = state.allUsers.map(e => e.username === action.payload.username ? action.payload.data : e)
            state.loading = false
        })
        builder.addCase(deleteAdmin.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteAdmin.fulfilled, (state, action) => {
            state.loading = false
            state.allUsers = state.allUsers.map(e => e._id === action.payload.id ? action.payload.data : e)
        })
    })
})
export default slice.reducer