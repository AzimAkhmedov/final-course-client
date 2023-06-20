import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICollection, ICollectionState, IItem } from "../../types";
import api from "../../shared/api";
import { toast } from "react-toastify";

const initialState: ICollectionState = {
    collections: [],
    currentCollection: [],
    collectionParams: [],
    lastCollections: [],
    error: false,
    loading: true
}

export const getCollections = createAsyncThunk('getCollections', async (username: string, __thunkAPI) => {
    try {
        const { data } = await api.getUserCollection(username)
        return data
    } catch (e) {
        return __thunkAPI.rejectWithValue(e)
    }
})
export const getCurrentCollection = createAsyncThunk('getCurrentCollection', async (props: any, __thunkAPI) => {
    const { username, collection } = props
    try {
        const { data } = await api.getCurrentCollection(username, collection)
        return data
    } catch (e) {
        return __thunkAPI.rejectWithValue(e)
    }
})
export const createCollection = createAsyncThunk('createCollection', async (collection: ICollection, __thunkAPI) => {
    try {
        const { data } = await api.createNewCollection(collection)
        return data
    } catch (e) {
        return __thunkAPI.rejectWithValue(e)
    }
})
export const getCollectionParams = createAsyncThunk('getCollectionParams', async (params: any, __thunkAPI) => {
    const { username, collection } = params
    try {
        const { data } = await api.getCollectionParams(username, collection)
        return data
    } catch (e) {
        return __thunkAPI.rejectWithValue(e)
    }

})
export const addToCollection = createAsyncThunk("addToCollection", async (item: IItem, __thunkAPI) => {
    try {
        const { data } = await api.addToCollection(item)
        return data
    } catch (e) {
        return __thunkAPI.rejectWithValue(e)
    }
})
export const deleteCollection = createAsyncThunk('deleteCollection', async (props: any, __thunkAPI) => {
    const { username, collection } = props
    try {
        const { data } = await api.deleteCollection(username, collection)
        if (data) {
            toast(collection + " был удален", { type: 'success' })
        }
        return collection
    } catch (e) {
        return __thunkAPI.rejectWithValue(e)
    }
})
export const getLastCollections = createAsyncThunk('getLastCollections', async (page: number) => {
    const { data } = await api.getLastCollections(page)
    return data
})

const slice = createSlice({
    initialState,
    name: 'collectionSlice',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCollections.fulfilled, (state, action) => {
            state.collections = action.payload
        }).addCase(getCollections.pending, (state, action) => {
            state.loading = true
        }).addCase(getCollections.rejected, (state) => {
            state.error = true
        })
        builder.addCase(getCurrentCollection.fulfilled, (state, action) => {
            state.currentCollection = action.payload
        })
        builder.addCase(createCollection.fulfilled, (state, action) => {
            state.collections = [...state.collections, action.payload]
        })
        builder.addCase(addToCollection.fulfilled, (state, action) => {
            state.currentCollection = [...state.currentCollection, action.payload]
        })
        builder.addCase(deleteCollection.fulfilled, (state, action) => {
            state.collections = state.collections.filter(e => e.collectionName !== action.payload)
        })

        builder.addCase(getCollectionParams.fulfilled, (state, action) => {
            state.collectionParams = action.payload
            state.loading = false
        }).addCase(getCollectionParams.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getLastCollections.fulfilled, (state, action) => {
            state.lastCollections = action.payload
        })
    }
})

export default slice.reducer