"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _errorHandler = require("../helpers/error-handler");

var _prize = require("../services/prize.service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.get("/prizes", async (req, res) => {
  try {
    const prizes = await (0, _prize.getPrizes)();
    res.json(prizes);
  } catch (error) {
    return (0, _errorHandler.handleResErrors)(error, res);
  }
});
router.patch("/prizes/:id", async (req, res) => {
  try {
    console.log(req.body);
    const prize = await (0, _prize.updatePercentageChance)(req.params.id, req.body.percentage_chance);
    res.json(prize);
  } catch (error) {
    return (0, _errorHandler.handleResErrors)(error, res);
  }
});
var _default = router;
exports.default = _default;