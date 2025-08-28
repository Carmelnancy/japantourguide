import mongoose from "mongoose";

const FestivalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    month: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Festival", FestivalSchema);
