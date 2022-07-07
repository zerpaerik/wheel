import express from "express";
import { handleResErrors } from "../helpers/error-handler";
import { seedPrizes } from "../services/prize.service";

const router = express.Router();

router.get("/seed/prizes", async (req, res) => {
  try {
    const prizes = await seedPrizes();
    res.json(prizes);
  } catch (error) {
    return handleResErrors(error, res);
  }
});

export default router;
