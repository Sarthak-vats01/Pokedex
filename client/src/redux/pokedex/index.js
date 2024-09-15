import { createSlice } from "@reduxjs/toolkit";

const pokedexSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemonData: [],
  },
  reducers: {
    updatePokedex: (state, action) => {
      state.pokemonData = action.payload;
    },
  },
});

// Correct export
export const { updatePokedex } = pokedexSlice.actions;
export default pokedexSlice.reducer;
