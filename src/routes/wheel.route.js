import express from "express";
import { handleResErrors } from "../helpers/error-handler";
import { spin } from "../services/wheel.service";

const router = express.Router();

router.patch("/wheel", async (req, res) => {
  try {
    const result = await spin(req.body);
    res.json(result);
  } catch (error) {
    return handleResErrors(error, res);
  }
});

export default router;
