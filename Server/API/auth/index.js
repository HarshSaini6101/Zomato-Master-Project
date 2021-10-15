import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { UserModel } from "../../database/user";

const Router = express.Router();

Router.post("/signup", async (req, res) => {
  try {
    const { email, password, fullname, phonenumber } = req.body.credentials;
    await UserModel.findByEmailAndPhone(req.body.credentials);
    const bcryptSalt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, bcryptSalt);
    await UserModel.create({
      ...req.body.credentials,
      password: hashedPassword,
    });
  
    const token = jwt.sign({ user: { fullname, email }}, "ZomatoAPP");
    return res.status(200).json({ token, status: "success" });}
    catch (error) {
      return res.status(500). json({ error: error.message });
    }
});

Router.post("/signin", async (req, res) => {
  try {
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
   return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


export default Router;