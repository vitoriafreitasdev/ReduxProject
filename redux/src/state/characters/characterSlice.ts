/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AmiiboRelease {
  au?: string;
  eu?: string;
  jp?: string;
  na?: string;
}

interface AmiiboItem {
  amiiboSeries: string;
  character: string;
  gameSeries: string;
  head: string;
  image: string;
  name: string;
  release: AmiiboRelease;
  tail: string;
  type: string;
}

interface AmiiboResponse {
  amiibo: AmiiboItem[];
}


interface UserState {
    favoritesCharacters: AmiiboItem[]
    users: AmiiboResponse | null,
    loading: boolean,
    totalOfFavs: number
}

const initialState: UserState = {
    favoritesCharacters: [],
    users: null,
    loading: false,
    totalOfFavs: 0
}

const characterSlice = createSlice({
    name: "character",
    initialState,
    reducers: {
        addToFavorites: (state, action) => {
            state.favoritesCharacters.push(action.payload)
            state.totalOfFavs += 1

        },
        deleteOfFavorites: (state, action) => {
            state.favoritesCharacters = state.favoritesCharacters.filter((f) => f.image != action.payload.image)
            state.totalOfFavs -= 1

        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(apiData.pending, (state) => {
            state.loading = true 
        })
        .addCase(apiData.fulfilled, (state, action) => {
            state.users = action.payload
            state.loading = false

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
        const json = await data.json()

        return json
    }
)

export const {addToFavorites, deleteOfFavorites} = characterSlice.actions

export default characterSlice.reducer