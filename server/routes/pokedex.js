import { Router } from "express";
import {
  addPokemon,
  showPokemon,
  statusPokemon,
} from "../controller.js/Pokedex.js";
import { signin, signup } from "../controller.js/userController.js";
import authMiddleware from "../controller.js/authMiddleware.js";

const router = Router();

router.post("/addPokemon", authMiddleware, addPokemon);
router.get("/showPokemon", authMiddleware, showPokemon);
router.post("/changeStatus", authMiddleware, statusPokemon);
router.post("/signup", signup);
router.post("/signin", signin);
export default router;
