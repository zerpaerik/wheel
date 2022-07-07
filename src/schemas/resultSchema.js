import mongoose from "mongoose";
const { Schema } = mongoose;

const resultSchema = new Schema(
  {
    player: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
      required: [true, "Player is required"],
    },
    credits: [
      {
        type: Schema.Types.ObjectId,
        ref: "Credit",
        required: [true, "Credit is required"],
      },
    ],
    prize: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Prize",
      required: [true, "Prize is required"],
    },
  },
  {
    timestamps: true,
  }
);
export const Result = mongoose.model("Result", resultSchema);
