import axios from "axios";
import {
  updatePokedex,
  updateCapturedPokemons,
} from "../redux/pokedex/index.js";
import { serverURL } from "../utils/constant.js";

async function fetchPokemon(dispatch) {
  const token = localStorage.getItem("token");
  try {
    const result = await axios.get(`${serverURL}/pokedex/showPokemon`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(updatePokedex(result.data));
  } catch (error) {
    console.log(`Error occured in fetchPokemon: ${error}`);
  }
}

async function statusChange({ id, status, userId, dispatch }) {
  const token = localStorage.getItem("token");
  try {
    const result = await axios.post(
      `${serverURL}/pokedex/changeStatus`,
      {
        id,
        captured: status,
        userId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(result.data);

    // Dispatch the updateCapturedPokemons action with the new captured Pokémon data
    dispatch(updateCapturedPokemons(result.data));
  } catch (error) {
    console.log(`Error occurred in statusChange: ${error}`);
  }
}

async function signup({ username, password, dispatch }) {
  try {
    const response = await axios.post(`${serverURL}/pokedex/signup`, {
      username,
      password,
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "capturedPokemons",
      JSON.stringify(response.data.pokemons)
    );
    dispatch(updateCapturedPokemons(response.data.pokemons));
    return response.data.userId;
  } catch (error) {
    console.log(`Error occurred during signing in: ${error}`);
    throw error;
  }
}

async function signin({ username, password, dispatch }) {
  try {
    const response = await axios.post(`${serverURL}/pokedex/signin`, {
      username,
      password,
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem(
      "capturedPokemons",
      JSON.stringify(response.data.pokemons)
    );
    dispatch(updateCapturedPokemons(response.data.pokemons));

    return response.data.userId; // Corrected this line
  } catch (error) {
    console.log(`Error occurred during signing in: ${error}`);
    throw error;
  }
}

function loadCapturedPokemonsFromLocalStorage(dispatch) {
  const capturedPokemons = localStorage.getItem("capturedPokemons");

  if (capturedPokemons) {
    // Parse capturedPokemons back to an object
    const parsedCapturedPokemons = JSON.parse(capturedPokemons);
    dispatch(updateCapturedPokemons(parsedCapturedPokemons));
  }
}

export {
  fetchPokemon,
  statusChange,
  signup,
  signin,
  loadCapturedPokemonsFromLocalStorage,
};
