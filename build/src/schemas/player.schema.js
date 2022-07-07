"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
const playerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "This name is already in use"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "This email is already in use"]
  }
}, {
  timestamps: true
});

const Player = _mongoose.default.model("Player", playerSchema);

exports.Player = Player;