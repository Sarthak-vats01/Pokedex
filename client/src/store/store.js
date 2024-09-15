import { configureStore } from "@reduxjs/toolkit";
import pokedexSlice from "../redux/pokedex/index.js";

const store = configureStore({
  reducer: {
    pokedex: pokedexSlice,
  },
});

export { store };
