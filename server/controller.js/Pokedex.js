import pokedexModel from "../model/model.js";

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
    const { id, captured } = req.body;

    // Validate input
    if (!id || captured === undefined) {
      console.log("Invalid or missing input value", id, captured);
      return res
        .status(400)
        .send("Missing or invalid input while changing pokemon");
    }

    // Find and update the Pokemon's captured status
    const updatedPokemon = await pokedexModel.findOneAndUpdate(
      { id: id },
      { captured: captured },
      { new: true }
    );

    // If the Pokémon is not found, return 404
    if (!updatedPokemon) {
      console.log(`Pokemon with id ${id} not found`);
      return res.status(404).send(`Pokemon not found`);
    }

    console.log(`Pokemon with id ${id} updated to captured = ${captured}`);

    // Send a success response
    return res.status(200).json(updatedPokemon);
  } catch (error) {
    console.log(`Error occurred in statusPokemon: ${error}`);

    // Send error response
    return res.status(500).send("Internal server error");
  }
}

export { addPokemon, showPokemon, statusPokemon };
