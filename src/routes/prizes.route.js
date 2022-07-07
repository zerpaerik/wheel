import express from "express";
import { handleResErrors } from "../helpers/error-handler";
import { getPrizes, updatePercentageChance } from "../services/prize.service";

const router = express.Router();

router.get("/prizes", async (req, res) => {
  try {
    const prizes = await getPrizes();
    res.json(prizes);
  } catch (error) {
    return handleResErrors(error, res);
  }
});

router.patch("/prizes/:id", async (req, res) => {
  try {
    console.log(req.body);
    const prize = await updatePercentageChance(req.params.id, req.body.percentage_chance);
    res.json(prize);
  } catch (error) {
    return handleResErrors(error, res);
  }
});

export default router;