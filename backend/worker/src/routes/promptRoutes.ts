import { Router } from "express";
import { createPrompt } from "../controllers/promptController";

const router = Router();

router.post('/prompt', createPrompt);

export default router;