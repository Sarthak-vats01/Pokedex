import { createSlice } from "@reduxjs/toolkit";

const pokedexSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemonData: [],
    capturedPokemons:
      JSON.parse(localStorage.getItem(`capturedPokemons`)) || [],
  },
  reducers: {
    updatePokedex: (state, action) => {
      state.pokemonData = action.payload;
    },
    updateCapturedPokemons: (state, action) => {
      state.capturedPokemons = action.payload;
      localStorage.setItem(
        `capturedPokemons`,
        JSON.stringify(state.capturedPokemons)
      );
    },
  },
});

// Correct export
export const { updatePokedex, updateCapturedPokemons } = pokedexSlice.actions;
export default pokedexSlice.reducer;
