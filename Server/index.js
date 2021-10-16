require("dotenv").config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

import googleAuthConfig from "./config/google.config";

import Auth from "./API/auth";
import Restaurant from "./API/restaurants";
import Foods from "./API/foods";

import ConnectDB from "./database/connection";

const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());

googleAuthConfig(passport);

zomato.use("/auth", Auth);
zomato.use("/restaurants", Restaurant);
zomato.use("/foods", Foods);

zomato.get("/", (req, res) => res.json({message : "setup succes"}) );

zomato.listen(4000, () =>
ConnectDB()
.then(() => console.log("Server is running "))
.catch(() =>
  console.log("Server is running, but database connection failed... ")
));