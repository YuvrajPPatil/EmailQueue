import { Router } from "express";
import { sendMail } from "../controllers/email.controller";

const router= Router();

router.post("/send",sendMail);

router.get("/api/email/test", (req, res) => {
  res.send("API is working");
});

export default router;

