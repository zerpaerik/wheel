"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Credit = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
const creditSchema = new Schema({
  code: {
    type: String,
    required: [true, "Code is required"],
    unique: [true, "This code is already in use"]
  },
  used_at: {
    type: Date,
    default: null
  },
  player: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Player",
    required: [true, "Player is required"]
  }
}, {
  timestamps: true
});

const Credit = _mongoose.default.model("Credit", creditSchema);

exports.Credit = Credit;