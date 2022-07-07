"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Result = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
const resultSchema = new Schema({
  player: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Player",
    required: [true, "Player is required"]
  },
  credits: [{
    type: Schema.Types.ObjectId,
    ref: "Credit",
    required: [true, "Credit is required"]
  }],
  prize: {
    type: _mongoose.default.Schema.Types.ObjectId,
    ref: "Prize",
    required: [true, "Prize is required"]
  }
}, {
  timestamps: true
});

const Result = _mongoose.default.model("Result", resultSchema);

exports.Result = Result;