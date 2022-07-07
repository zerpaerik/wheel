"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _errorHandler = require("../helpers/error-handler");

var _wheel = require("../services/wheel.service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.patch("/wheel", async (req, res) => {
  try {
    const result = await (0, _wheel.spin)(req.body);
    res.json(result);
  } catch (error) {
    return (0, _errorHandler.handleResErrors)(error, res);
  }
});
var _default = router;
exports.default = _default;