import axios from "axios";
import { updatePokedex } from "../redux/pokedex/index.js";
import { serverURL } from "../utils/constant.js";

async function fetchPokemon(dispatch) {
  try {
    const result = await axios.get(`${serverURL}/pokedex/showPokemon`);
    console.log(result.data);
    dispatch(updatePokedex(result.data));
  } catch (error) {
    console.log(`Error occured in fetchPokemon: ${error}`);
  }
}

async function statusChange({ id, status }) {
  try {
    const result = await axios.post(`${serverURL}/pokedex/changeStatus`, {
      id,
      captured: status,
    });
    console.log(result.data);
  } catch (error) {
    console.log(`Error occured in statusChange`);
  }
}
export { fetchPokemon, statusChange };
