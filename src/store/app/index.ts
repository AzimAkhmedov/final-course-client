import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAppReducer } from "../../types";
import api from "../../shared/api";

const initialState: IAppReducer = {
    lang: "Ru",
    darkMode: false,
    searchResult: {
        resultCollectionNames: [],
        resultCommentMessages: [],
        resultItemNames: [],
        resultItemParams: []
    },
    error: false,
    loading: false,
    adminSidebar: false
}
export const Search = createAsyncThunk('Search', async (params: string) => {
    const { data } = await api.search(params)
    return data
})

const slice = createSlice({
    initialState, name: "appSlice", reducers: {
        changeLang(state, action) {
            state.lang = action.payload ? 'En' : 'Ru'
        },
        setLang(state, actions) {
            state.lang = actions.payload
        }
        , changeMode(state, action) {
            state.darkMode = action.payload
        },
        handleSidebar(state) {
            state.adminSidebar = !state.adminSidebar
        }
    }, extraReducers: (builder) => {
        builder.addCase(Search.pending, (state) => {
            state.loading = true
        }).addCase(Search.rejected, (state) => {
            state.loading = false
            state.error = true
        }).addCase(Search.fulfilled, (state, action) => {
            state.loading = false
            state.searchResult = action.payload
        })
    }
})

export const { changeLang, setLang, changeMode, handleSidebar } = slice.actions
export default slice.reducer