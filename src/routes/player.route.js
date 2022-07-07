import express from "express";
import { handleResErrors } from "../helpers/error-handler";
import { addPlayer } from '../services/player.service';
import { getAvailableCredits } from '../services/credit.service';

const router = express.Router();

router.post("/player", async (req, res) => {
  try {
    const player = await addPlayer(req.body);
    res.json(player);
  } catch (error) {
    return handleResErrors(error, res);
  }
});

router.get("/player/:id/credits", async (req, res) => {
  try {
    const credits = await getAvailableCredits({ player: req.params.id });
    res.json(credits);
  } catch (error) {
    return handleResErrors(error, res);
  }
});

export default router;