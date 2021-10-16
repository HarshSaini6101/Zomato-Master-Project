import express from "express";
import passport from "passport";

// Database Modals
import { RestaurantModal } from "../../database/AllModals";

const Router = express.Router();

// @Route   GET /restaurants/
// @des     GEt all restaurant of a particular city
// @access  PUBLIC
Router.get("/", async (req, res) => {
  try {
    const { city} = req.query;
    const restaurants = await RestaurantModal.find({ city });
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get("/:_id", async (req, res) => {
    try {
        const { _id } = req.params;
      const restaurant = await RestaurantModal.findOne(_id);
      if (!restaurant)
        return res.status(404).json({ error: "Restaurant Not Found!!!" });
  
      return res.json({ restaurants });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  Router.get("/search", async (req, res) => {
    try {
      const { searchString } = req.body;
      const restaurants = await RestaurantModal.find({
        name: { $regex: searchString, $options: "i" },
      });
      if (!restaurants)
      return res.status(404).json({ error: `No Restaurant matched with ${searchString}` });

    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
  });

export default Router;