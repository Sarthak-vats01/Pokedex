import { Router } from "express";
import {
  addPokemon,
  showPokemon,
  statusPokemon,
} from "../controller.js/Pokedex.js";

const router = Router();

router.post("/addPokemon", addPokemon);
router.get("/showPokemon", showPokemon);
router.post("/changeStatus", statusPokemon);

export default router;
