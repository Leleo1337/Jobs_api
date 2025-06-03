import express from "express";
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/users.js";

const router = express.Router();

// rotas users ( admin )

// - /api/v1/users/
router.get("/", getAllUsers);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;