import mongoose from "mongoose";
const { Schema } = mongoose;

const playerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "This name is already in use"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "This email is already in use"]
    }
  },
  {
    timestamps: true,
  }
);
export const Player = mongoose.model("Player", playerSchema);
