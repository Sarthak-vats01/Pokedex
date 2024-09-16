import axios from "axios";
import { updatePokedex } from "../redux/pokedex/index.js";
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

async function statusChange({ id, status }) {
  const token = localStorage.getItem("token");
  try {
    const result = await axios.post(
      `${serverURL}/pokedex/changeStatus`,
      {
        id,
        captured: status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(result.data);
  } catch (error) {
    console.log(`Error occurred in statusChange: ${error}`);
  }
}

async function signup({ username, password }) {
  try {
    const response = await axios.post(`${serverURL}/pokedex/signup`, {
      username,
      password,
    });

    localStorage.setItem("token", response.data.token);

    return response.data.userId;
  } catch (error) {
    console.log(`Error occurred during signing in: ${error}`);
    throw error;
  }
}

async function signin({ username, password }) {
  try {
    const response = await axios.post(`${serverURL}/pokedex/signin`, {
      username,
      password,
    });

    localStorage.setItem("token", response.data.token);

    return response.data.userId; // Corrected this line
  } catch (error) {
    console.log(`Error occurred during signing in: ${error}`);
    throw error;
  }
}

export { fetchPokemon, statusChange, signup, signin };
