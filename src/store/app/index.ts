import { createSlice } from "@reduxjs/toolkit";
import { IAppReducer } from "../../types";

const initialState: IAppReducer = {
    lang: "Ru"
}

const slice = createSlice({
    initialState, name: "appSlice", reducers: {
        changeLang(state) {
            state.lang = state.lang === 'En' ? 'Ru' : 'En'
        },
        setLang(state, actions) {
            state.lang = actions.payload
        }
    }
})

export const { changeLang, setLang } = slice.actions
export default slice.reducer