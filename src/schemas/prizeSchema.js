import mongoose from "mongoose";
const { Schema } = mongoose;

const prizeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: [true, "This name is already in use"],
    },
    credit_cost: {
        type: Number,
        required: [true, "Credit cost is required"]
    },
    image: {
        type: String,
        required: [false, "Image is required"],
    },
    percentage_chance: {
        type: Number,
        min: [0, "The value of `{PATH}` is beneath the min limit"],
        max: [100, "The value of `{PATH}` can't exceed 100"],
        required: [true, "Percentage chance is required"],
    },
    is_active: {
        type: Boolean,
        default: true
    }
  },
  {
    timestamps: true,
  }
);
export const Prize = mongoose.model("Prize", prizeSchema);
