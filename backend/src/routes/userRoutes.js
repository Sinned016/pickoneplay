import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { getUserData } from "../controllers/userController.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/user-data", getUserData);

export default router;
