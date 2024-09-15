import mongoose from "mongoose";

const pokedexSchema = new mongoose.Schema({
  id: { type: Number, required: true }, // Use Number for id
  name: { type: String, required: true },
  imgUrl: { type: String },
  captured: { type: Boolean, default: false },
  pokemonTypes: { type: [String], required: true }, // Array of Strings to represent types like ["Grass", "Poison"]
});

const pokedexModel = mongoose.model("Pokedex", pokedexSchema);

export default pokedexModel;
