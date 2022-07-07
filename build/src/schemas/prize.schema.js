"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Prize = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
const prizeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "This name is already in use"]
  },
  credit_cost: {
    type: Number,
    required: [true, "Credit cost is required"]
  },
  image: {
    type: String,
    required: [false, "Image is required"]
  },
  percentage_chance: {
    type: Number,
    min: [0, "The value of `{PATH}` is beneath the min limit"],
    max: [100, "The value of `{PATH}` can't exceed 100"],
    required: [true, "Percentage chance is required"]
  },
  is_active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Prize = _mongoose.default.model("Prize", prizeSchema);

exports.Prize = Prize;