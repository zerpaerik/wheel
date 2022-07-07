import express from "express";
import { handleResErrors } from "../helpers/error-handler";
import { addCredit } from "../services/credit.service";

const router = express.Router();

router.post("/credit", async (req, res) => {
  try {
    const credit = await addCredit(req.body);
    res.json(credit);
  } catch (error) {
    return handleResErrors(error, res);
  }
});

export default router;
