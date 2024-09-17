import userModel from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//sign-up

async function signup(req, res) {
  const { username, password } = req.body;
  console.log("signup...");

  try {
    const existingUser = await userModel.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({ username, password: hashedPassword });

    const result = await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res
      .status(201)
      .json({ userId: newUser._id, token, pokemons: result.capturedPokemons });
  } catch (error) {
    console.log("Error signing up", error);
    res.status(400).json({ error });
  }
}

//signin

async function signin(req, res) {
  console.log("signin...");
  const { username, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ message: "User does not exist." });
    }

    // Await the comparison result
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: existingUser._id, username: existingUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      userId: existingUser._id,
      token,
      pokemons: existingUser.capturedPokemons,
    }); // Change status to 200 for successful login
  } catch (error) {
    console.log("Error signing in", error);
    res.status(500).json({ error: "Server error" }); // Change status to 500 for server error
  }
}

export { signup, signin };
