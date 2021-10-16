import express from "express";
import passport from "passport";

import { FoodModal } from "../../database/AllModals";

const Router = express.Router();

Router.get("/r/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const allFoods = await FoodModal.find({ restaurant: _id });
      return res.json({ foods });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  Router.get("/c/:category", async (req, res) => {
    try {
      const { category } = req.params;
      const foods = await FoodModal.find({ category: { $regex: category, $options: "i" },
     });
      return res.json({ foods });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

export default Router;