"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _errorHandler = require("../helpers/error-handler");

var _credit = require("../services/credit.service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post("/credit", async (req, res) => {
  try {
    const credit = await (0, _credit.addCredit)(req.body);
    res.json(credit);
  } catch (error) {
    return (0, _errorHandler.handleResErrors)(error, res);
  }
});
var _default = router;
exports.default = _default;