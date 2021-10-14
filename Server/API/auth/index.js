import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserModel } from "../../database/user";

const Router = express.Router();

Router.post("/signup", async (req, res) => {
  try {
    await UserModal.findByEmailAndPhone(req.body.credentials);
    const newUser = await UserModel.create(req.body.credentials)
    const token = newUser.generateJwtToken();
   return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});




export default Router;