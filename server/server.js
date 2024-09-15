import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";
import pokedex from "./routes/pokedex.js";

const app = express();
const port = 8000;

dotenv.config();
app.use(express.json());
app.use(cors());

db();

app.use("/pokedex", pokedex);

app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
