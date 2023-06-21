import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IItemState } from "../../types"
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
const initialState: IItemState = {
    comments: [],
    error: false,
    itemsLoader: false,
    items: [],
    likes: []
}

const slice = createSlice({
    initialState, name: "ItemSlice", reducers: {
    }, extraReducers: (builder) => {
        builder.addCase(getItems.fulfilled, (state, action) => {
            state.items = action.payload
        })
    }
})




export const { } = slice.actions
export default slice.reducer