import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"

// ------------------- Tipos -------------------
interface AmiiboRelease {
  au?: string
  eu?: string
  jp?: string
  na?: string
}

export interface AmiiboItem {
  amiiboSeries: string
  character: string
  gameSeries: string
  head: string
  image: string
  name: string
  release: AmiiboRelease
  tail: string
  type: string
}

export interface AmiiboResponse {
  amiibo: AmiiboItem[]
}

interface UserState {
  favoritesCharacters: AmiiboItem[]
  users: AmiiboResponse | null
  loading: boolean
  totalOfFavs: number
  filter: AmiiboItem[] | null
}

// ------------------- Estado inicial -------------------
const initialState: UserState = {
  favoritesCharacters: [],
  users: null,
  loading: false,
  totalOfFavs: 0,
  filter: null
}

// ------------------- Thunk para buscar API -------------------
export const apiData = createAsyncThunk<AmiiboResponse, string>(
  "character/apiData",
  async (url) => {
    const data = await fetch(url)
    const json = await data.json()
    return json as AmiiboResponse
  }
)

// ------------------- Slice -------------------
const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<AmiiboItem>) => {
      state.favoritesCharacters.push(action.payload)
      state.totalOfFavs += 1
    },

    deleteOfFavorites: (state, action: PayloadAction<AmiiboItem>) => {
      state.favoritesCharacters = state.favoritesCharacters.filter(
        (f) => f.image !== action.payload.image
      )
      state.totalOfFavs -= 1
    },

    filterData: (state, action: PayloadAction<string>) => {
      const term = action.payload.trim().toLowerCase()

      if (!term) {
        state.filter = state.users?.amiibo ?? []
        return
      }

      const filtered = state.users?.amiibo.filter((a) =>
        a.name.toLowerCase().includes(term)
      )

      state.filter = filtered ?? []
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
      .addCase(apiData.rejected, (state, action) => {
        state.loading = false
        console.error("Erro ao buscar API:", action.error.message)
      })
  }
})

// ------------------- Exportações -------------------
export const { addToFavorites, deleteOfFavorites, filterData } =
  characterSlice.actions

export default characterSlice.reducer
