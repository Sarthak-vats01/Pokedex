import pokedexModel from "../model/model.js";
import userModel from "../model/user.js";

async function addPokemon(req, res) {
  console.log(`Add Pokemon initiated`);

  try {
    const { id, name, captured, imgUrl, pokemonTypes } = req.body;

    console.log(id, name, captured, imgUrl, pokemonTypes);

    // Check for undefined values & falsy values
    if (
      id === undefined ||
      !name ||
      imgUrl === undefined ||
      !Array.isArray(pokemonTypes) ||
      pokemonTypes.length === 0
    ) {
      console.log(
        `Input value missing in addPokemon: ${id}, ${name}, ${captured}, ${imgUrl}, ${pokemonTypes}`
      );
      return res.status(400).send(`Missing or invalid input in addPokemon`);
    }

    const pokemon = new pokedexModel({
      id,
      name,
      captured,
      imgUrl,
      pokemonTypes,
    });

    const result = await pokemon.save();

    console.log(`Pokedex received a new Pokémon named ${result.name}`);
    res.status(200).json(result);
  } catch (error) {
    console.log(`Error occurred in Add Pokemon: ${error}`);
    res.status(500).send(`Internal server error`);
  }
}

async function showPokemon(req, res) {
  console.log(`showPokemon initiated...`);
  try {
    const pokemon = await pokedexModel.find();

    res.status(200).send(pokemon);
  } catch (error) {
    console.log(`Error occured in showPokemom: ${error}`);
  }
}

async function statusPokemon(req, res) {
  console.log("pokemon status changing...");

  try {
    const { id, userId, captured } = req.body;

    // Validate input
    if (!id || !userId || captured == null) {
      console.log("Invalid or missing input value", { id, captured, userId });
      return res
        .status(400)
        .send("Missing or invalid input while changing pokemon");
    }

    // Find user by userId
    const user = await userModel.findById(userId);

    if (!user) {
      console.log(`User with id ${userId} not found`);
      return res.status(400).json({ message: "User not found" });
    }

    // Check if the Pokémon is already captured
    const isCaptured = user.capturedPokemons.some(
      (item) => item.pokemonId == id
    );

    if (!isCaptured && captured) {
      // If Pokémon is not captured and should be captured, add it
      user.capturedPokemons.push({ pokemonId: id });
    } else if (isCaptured && !captured) {
      // If Pokémon is already captured but should be uncaptured, remove it
      user.capturedPokemons = user.capturedPokemons.filter(
        (item) => item.pokemonId != id
      );
    }

    // Save user changes
    const result = await user.save();
    console.log(result);

    // Send success response with updated capturedPokemons array
    return res.status(200).json({ data: result.capturedPokemons });
  } catch (error) {
    console.log(`Error occurred in statusPokemon: ${error}`);

    // Send error response
    return res.status(500).send("Internal server error");
  }
}

export { addPokemon, showPokemon, statusPokemon };
