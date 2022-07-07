"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spin = spin;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _result = require("../schemas/result.schema");

var _credit = require("./credit.service");

var _prize = require("./prize.service");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function spin({
  noOfCredits,
  player
}) {
  const session = await _mongoose.default.startSession();
  session.startTransaction();

  try {
    const usedCredits = await (0, _credit.consumeCredits)({
      noOfCredits,
      player
    });
    const prizesAvailables = await (0, _prize.getPrizesForWheel)({
      noOfCredits
    });
    const selectedPrize = getRandomPrizeBasedOnChances(prizesAvailables);
    await saveResult({
      player,
      prize: selectedPrize._id,
      credits: usedCredits.creditsToUse.map(c => c._id)
    });
    return {
      selectedPrize,
      creditsLeft: usedCredits.creditsLeft
    };
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
}

async function saveResult({
  player,
  prize,
  credits
}) {
  const result = new _result.Result({
    player,
    prize,
    credits
  });
  return await result.save();
}

function getRandomPrizeBasedOnChances(prizes) {
  const randomNumber = Math.floor(Math.random() * 100);
  let selectedPrize = null;
  let accumulativeChance = 0;

  for (let i = 0; i < prizes.length; i++) {
    let minRange = randomNumber > accumulativeChance;
    let maxRange = randomNumber <= prizes[i].percentage_chance + accumulativeChance;

    if (minRange && maxRange) {
      selectedPrize = prizes[i];
      break;
    } else {
      accumulativeChance += prizes[i].percentage_chance;
    }
  }

  if (!selectedPrize) {
    throw Error("Prize not defined");
  }

  return selectedPrize;
}