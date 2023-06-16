import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICollection, ICollectionState, IItem } from "../../types";
import api from "../../shared/api";

const initialState: ICollectionState = {
    collections: [],
    currentCollection: [],
    error: false,
    loading: true
}

const getCollections = createAsyncThunk('getCollections', async (username: string, __thunkAPI) => {
    try {
        const { data } = await api.getUserCollection(username)
        return data
    } catch (e) {
        return __thunkAPI.rejectWithValue(e)
    }
})
const getCurrentCollection = createAsyncThunk('getCurrentCollection', async (props: any, __thunkAPI) => {
    const { username, collection } = props
    try {
        const { data } = await api.getCurrentCollection(username, collection)
        return data
    } catch (e) {
        return __thunkAPI.rejectWithValue(e)
    }
})
const createCollection = createAsyncThunk('createCollection', async (collection: ICollection, __thunkAPI) => {
    try {
        const { data } = await api.createNewCollection(collection)
        return data
    } catch (e) {
        return __thunkAPI.rejectWithValue(e)
    }
})
const addToCollection = createAsyncThunk("addToCollection", async (item: IItem, __thunkAPI) => {
    try {
        const { data } = await api.addToCollection(item)
        return data
    } catch (e) {
        return __thunkAPI.rejectWithValue(e)
    }
})
const deleteCollection = createAsyncThunk('deleteCollection', async (props: any, __thunkAPI) => {
    const { username, collection } = props
    try {
        const { data } = await api.deleteCollection(username, collection)
        return collection
    } catch (e) {
        return __thunkAPI.rejectWithValue(e)
    }
})
const slice = createSlice({
    initialState,
    name: 'collectionSlice',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCollections.fulfilled, (state, action) => {
            state.collections = action.payload
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
            state.collections = state.collections.filter(e => e.collectionName != action.payload)
        })
    }
})

export const { } = slice.actions
export default slice.reducer