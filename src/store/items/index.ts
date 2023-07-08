import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IComment, IItem, IItemState, ILike } from "../../types"
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
    isLiked: false,
    currentItem: {
        itemName: "",
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
export const getComments = createAsyncThunk('getComments', async (_id: string, __thunkAPI) => {
    try {
        const { data } = await api.getComments(_id)
        return data
    } catch (error) {
        return __thunkAPI.rejectWithValue(error)
    }
})
export const writeComment = createAsyncThunk('writeComment', async (arg: IComment, __thunkAPI) => {
    try {
        const { data } = await api.writeComment(arg)
        return data
    } catch (error) {
        return __thunkAPI.rejectWithValue(error)
    }
})
export const getLikes = createAsyncThunk('getLikes', async (itemId: string, thunkAPI) => {
    try {
        const { data } = await api.getLikes(itemId)
        console.log('likes', data);


        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const pressLike = createAsyncThunk('pressLike', async (like: ILike, thunkAPI) => {
    try {
        const { data } = await api.pressLike(like)
        console.log(like);

        return { data, wholikes: like.wholikes }
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const getIsLiked = createAsyncThunk('getIsLiked', async (arg: any, thunkAPI) => {
    try {
        const { data } = await api.isLiked(arg.itemId, arg.wholikes)
        return data
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
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
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.comments = action.payload
        })
        builder.addCase(writeComment.fulfilled, (state, action) => {
            state.comments = [action.payload, ...state.comments]
        })
        builder.addCase(getLikes.fulfilled, (state, action) => {
            state.likes = action.payload
            state.itemsLoader = false

        })
        builder.addCase(pressLike.fulfilled, (state, action) => {
            state.likes = state.isLiked ? state.likes.filter(e => e.wholikes !== action.payload.wholikes) : [...state.likes, action.payload.data]
            state.itemsLoader = false

        })
        builder.addCase(getIsLiked.fulfilled, (state, action) => {
            state.isLiked = action.payload
            state.itemsLoader = false

        })
        builder.addCase(getIsLiked.pending, (state) => {
            state.itemsLoader = true
        })

        builder.addCase(pressLike.pending, (state) => {
            state.itemsLoader = true
        })

        builder.addCase(getLikes.pending, (state) => {
            state.itemsLoader = true
        })
    }
})




export default slice.reducer