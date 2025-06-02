import express from "express";
import { createJob, deleteJob, getAllJobs, getJob, updateJob } from "../controllers/jobs.js";

const router = express.Router();

// @/api/v1/jobs/
router.get("/", getAllJobs);
router.get("/:id", getJob);
router.post("/", createJob);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
