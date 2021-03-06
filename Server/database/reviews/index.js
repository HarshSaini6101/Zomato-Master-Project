import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  reviewText: { type: String, required: true },
  food: { type: mongoose.Types.ObjectId, ref: "Images" },
  restaurant: { type: mongoose.Types.ObjectId, ref: "Restaurant" },
  rating: Number,
  photos:[ { type: mongoose.Types.ObjectId, ref: "Images" },],
  rating: Number,
  user: { type: mongoose.Types.ObjectId, ref: "Users" },
},
{
    timestamps: true,
}
);
export const ReviewModel = mongoose.model("Reviews", ReviewSchema);