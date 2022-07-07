import mongoose from "mongoose";
const { Schema } = mongoose;

const creditSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, "Code is required"],
      unique: [true, "This code is already in use"],
    },
    used_at: {
        type: Date,
        default: null
    },
    player: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Player",
        required: [true, "Player is required"],
    }
  },
  {
    timestamps: true,
  }
);
export const Credit = mongoose.model("Credit", creditSchema);
