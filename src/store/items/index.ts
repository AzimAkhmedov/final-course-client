import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IItem, IItemState } from "../../types"
import api from "../../shared/api"


export const getItems = createAsyncThunk('getItems', async (props: any, thunkAPI) => {
    try {
        const { username, collectionName } = props
        const { data } = await api.getCurrentCollection(username, collectionName)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
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
export const removeFromCollection = createAsyncThunk('removeFromCollection', async (id: string, thunkAPI) => {
    try {
        const { data } = await api.deleteFromCollection(id)
        return { id, data }
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
const initialState: IItemState = {
    comments: [],
    error: false,
    itemsLoader: false,
    items: [],
    currentItem: {
        collectionName: "",
        params: {},
        tags: [],
        username: "",
        _id: ""
    },
    likes: []
}
export const getSingleItem = createAsyncThunk('getSingleItem', async (_id: string) => {
    const { data } = await api.getCurrentItem(_id)
    return { data }
})

const slice = createSlice({
    initialState, name: "ItemSlice", reducers: {
    }, extraReducers: (builder) => {
        builder.addCase(getItems.fulfilled, (state, action) => {
            state.items = action.payload
            state.itemsLoader = false

        }).addCase(getItems.pending, (state) => {
            state.itemsLoader = true
        })
        builder.addCase(addToCollection.fulfilled, (state, action) => {
            state.items = [...state.items, action.payload]
            state.itemsLoader = false
        }).addCase(addToCollection.pending, (state) => {
            state.itemsLoader = true

        })
        builder.addCase(removeFromCollection.fulfilled, (state, action) => {
            state.items = state.items.filter(e => e._id !== action.payload.id)
            state.itemsLoader = false

        }).addCase(removeFromCollection.pending, (state) => {
            state.itemsLoader = true
        })
        builder.addCase(getSingleItem.fulfilled, (state, action) => {
            state.currentItem = action.payload.data
        })
    }
})




// export const { } = slice.actions
export default slice.reducer