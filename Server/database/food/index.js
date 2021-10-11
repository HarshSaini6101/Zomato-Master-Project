import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    isVeg: { type: Boolean, required: true},
    isContainEgg: { type: Boolean, required: true },
    category: { type: String, required: true },
    restaurants: {
        type: mongoose.Type.ObjectId, ref: "Images" },
    photos: { 
        type: mongoose.Types.ObjectId, ref: "Images" },
    price: { type: Number, default: 150, required: true },
    addOns: [
        {
            type: mongoose.Types.ObjectId, ref: "Foods",
        },
    ],
});

export const FoodModel = mongoose.model("Foods", FoodSchema);