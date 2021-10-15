import mongoose from "mongoose";

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    isVeg: { type: Boolean, required: true},
    isContainEgg: { type: Boolean, required: true },
    category: { type: String, required: true },
    restaurants: {
        type: mongoose.type.ObjectId, ref: "Images" },
    photos: { 
        type: mongoose.types.ObjectId, ref: "Images" },
    price: { type: Number, default: 150, required: true },
    addOns: [
        {
            type: mongoose.types.ObjectId, ref: "Foods",
        },
    ],
},
{
    timestamps: true,
});

export const FoodModel = mongoose.model("Foods", FoodSchema);