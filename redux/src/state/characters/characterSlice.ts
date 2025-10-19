/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// testar carregar os dados da api usando o reducer apiData
// Adicionar/remover usuários dos favoritos (armazenados no Redux)

interface UserState {
    favoritesCharacters: string[],
    users: []
}

const initialState: UserState = {
    favoritesCharacters: [],
    users: []
}

const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(apiData.pending, () => {
            console.log("Aguarde")
        })
        .addCase(apiData.fulfilled, (state, action) => {
            state.users = action.payload
        })
        .addCase(apiData.rejected, (_, action) => {
            console.log("Error ", action.error.message)
        })
    }
})

export const apiData = createAsyncThunk(
    "character/apiData", 
    async(url: string) => {
        const data = await fetch(url)
        const json = data.json()

        return json
    }
)

export default characterSlice.reducer