import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createGame,
  deleteGame,
  getGame,
  getGames,
  updateGame,
} from "../controllers/gameController.js";

const router = express.Router();

router.post("/create", authMiddleware, createGame);

router.delete("/delete/:id", authMiddleware, deleteGame);

router.put("/update/:id", authMiddleware, updateGame);

router.get("/games", getGames);

router.get("/:id", getGame);

export default router;
