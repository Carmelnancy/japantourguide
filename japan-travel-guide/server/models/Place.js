import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Place", PlaceSchema);
