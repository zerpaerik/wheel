import mongoose from "mongoose";
import { Result } from "../schemas/resultSchema";
import { consumeCredits } from "./credit.service";
import { getPrizesForWheel } from "./prize.service";

export { spin };

async function spin({ noOfCredits, player }) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const usedCredits = await consumeCredits({ noOfCredits, player });
    const prizesAvailables = await getPrizesForWheel({ noOfCredits });
    const selectedPrize = getRandomPrizeBasedOnChances(prizesAvailables);
    await saveResult({
      player,
      prize: selectedPrize._id,
      credits: usedCredits.creditsToUse.map((c) => c._id),
    });
    return { selectedPrize, creditsLeft: usedCredits.creditsLeft }
  } catch (error) {
    console.log(error);
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
}

async function saveResult({ player, prize, credits }) {
  const result = new Result({
    player,
    prize,
    credits,
  });
  return await result.save();
}

function getRandomPrizeBasedOnChances(prizes) {
  const randomNumber = Math.floor(Math.random() * 100);
  let selectedPrize = null;
  let accumulativeChance = 0;

  for (let i = 0; i < prizes.length; i++) {
    let minRange = randomNumber > accumulativeChance;
    let maxRange =
      randomNumber <= prizes[i].percentage_chance + accumulativeChance;
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
