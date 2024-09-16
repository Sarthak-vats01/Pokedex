import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  capturedPokemons: [
    {
      pokemonId: { type: Number, required: true },
    },
  ],
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
