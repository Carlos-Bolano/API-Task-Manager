import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  try {
    const { email, password, username, ocupation } = req.body

    const userFound = await User.findOne({ email });

    if (userFound)
      return res.status(400).json({
        message: ["correo ya esta en uso"],
      });

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the user
    const newUser = new User({
      username,
      ocupation,
      email,
      password: passwordHash
    });

    // saving the user in the database
    const userSaved = await newUser.save();

    // create access token
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userSaved.id,
      username: userSaved.username,
      ocupation: userSaved.ocupation,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["Correo no existe"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["Contraseña incorrecta"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token, {
      httpOnly: process.env.NODE_ENV !== "development",
      secure: true,
      sameSite: "none",
    });

    res.json({
      id: userFound.id,
      username: userFound.username,
      email: userFound.email,
      ocupation: userFound.ocupation,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);
  try {
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.sendStatus(401);

      const userFound = await User.findById(user.id);
      if (!userFound) return res.sendStatus(401);

      return res.status(200).json({
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        ocupation: userFound.ocupation,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
        token: token
      })
    });
  } catch (error) {
    console.log(error)
  }
};

export const profile = async (req, res) => {
  try {
    const id = req.user.id
    const userFound = await User.findById(id)
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" })

    return res.json({
      id: userFound.id,
      username: userFound.username,
      ocupation: userFound.ocupation,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    })
  } catch (error) {
    console.log(error)
  }
}

export const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(200);
};