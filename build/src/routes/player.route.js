"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _errorHandler = require("../helpers/error-handler");

var _player = require("../services/player.service");

var _credit = require("../services/credit.service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express.default.Router();

router.post("/player", async (req, res) => {
  try {
    const player = await (0, _player.addPlayer)(req.body);
    res.json(player);
  } catch (error) {
    return (0, _errorHandler.handleResErrors)(error, res);
  }
});
router.get("/player/:id/credits", async (req, res) => {
  try {
    const credits = await (0, _credit.getAvailableCredits)({
      player: req.params.id
    });
    res.json(credits);
  } catch (error) {
    return (0, _errorHandler.handleResErrors)(error, res);
  }
});
var _default = router;
exports.default = _default;