import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICollection, ICollectionState, IItem } from "../../types";
import api from "../../shared/api";
import { toast } from "react-toastify";

const initialState: ICollectionState = {
    collections: [],
    themes: [],
    currentCollection: [],
    collectionParams: [],
    lastCollections: [],
    largestCollections: [],
    tags: [],
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
export const deleteCollection = createAsyncThunk('deleteCollection', async (_id: string, __thunkAPI) => {
    try {
        const { data } = await api.deleteCollection(_id)
        if (data) {
            toast("Коллекция  была удаленена", { type: 'success' })
        }
        return _id
    } catch (e) {
        return __thunkAPI.rejectWithValue(e)
    }
})
export const getLastCollections = createAsyncThunk('getLastCollections', async (page: number) => {
    const { data } = await api.getLastCollections(page)
    return data
})
export const getThemes = createAsyncThunk('getThemes', async (_, thunkAPI) => {
    try {
        const { data } = await api.getCollectionThemes()
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getPagesByTheme = createAsyncThunk('getPagesByTheme', async (params: any, __thunkAPI) => {
    try {
        const { data } = await api.getPagesByTheme(params.theme, params.page)
        return data
    } catch (error) {
        return __thunkAPI.rejectWithValue(error)
    }
})
export const getTags = createAsyncThunk('getTags', async (_, thunkAPI) => {
    try {
        const { data } = await api.getTags()
        return data
    } catch (e) {
        return thunkAPI.rejectWithValue(e)
    }
})
export const getLargestFive = createAsyncThunk('getLargestFive', async () => {
    try {
        const { data } = await api.getLargestFive()
        return data
    } catch (error) {
        return error
    }
})
const slice = createSlice({
    initialState,
    name: 'collectionSlice',
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCollections.fulfilled, (state, action) => {
            state.collections = action.payload
            state.loading = false

        }).addCase(getCollections.pending, (state, action) => {
            state.loading = true
        }).addCase(getCollections.rejected, (state) => {
            state.error = true
        })
        builder.addCase(getCurrentCollection.fulfilled, (state, action) => {
            state.currentCollection = action.payload
            state.loading = false

        })
        builder.addCase(createCollection.fulfilled, (state, action) => {
            state.collections = [...state.collections, action.payload]
            state.loading = false

        })
        builder.addCase(deleteCollection.fulfilled, (state, action) => {
            state.collections = state.collections.filter(e => e._id !== action.payload)
            state.loading = false
        })

        builder.addCase(getCollectionParams.fulfilled, (state, action) => {
            state.collectionParams = action.payload
            state.loading = false
        }).addCase(getCollectionParams.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getLastCollections.fulfilled, (state, action) => {
            state.lastCollections = action.payload
            state.loading = false
        })
        builder.addCase(getThemes.fulfilled, (state, action) => {
            state.themes = action.payload
        })
        builder.addCase(getPagesByTheme.fulfilled, (state, action) => {
            state.lastCollections = action.payload
        })
        builder.addCase(getTags.fulfilled, (state, action) => {
            state.tags = action.payload
        })
        builder.addCase(getLargestFive.fulfilled, (state, action) => {
            state.largestCollections = action.payload
        })
    }
})

export default slice.reducer