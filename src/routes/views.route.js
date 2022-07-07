import express from "express";
import { handleResErrors } from "../helpers/error-handler";
import path from 'path';

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    return res.sendFile(path.join(__dirname, "../public/index.html"))
  } catch (error) {
    console.log(error);
    return handleResErrors(error, res);
  }
});

export default router;
