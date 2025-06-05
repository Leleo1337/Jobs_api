import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest, NotFound } from "../errors/index.js";

export async function getAllJobs(req, res) {
   const jobs = await Job.find({createdBy: req.user.userID}).sort('createdAt');
   res.status(StatusCodes.OK).json({ success: true, count: jobs.length, jobs });
}

export async function getJob(req, res) {
   const { id } = req.params;
   const job = await Job.findById(id);
   if (!job) {
      throw new NotFound(`no job with id ${id} found`);
   }
   res.status(StatusCodes.OK).json({ success: true, job });
}
export async function createJob(req, res) {
   req.body.createdBy = req.user.userID;

   const job = await Job.create(req.body);

   res.status(StatusCodes.CREATED).json({ success: true, createdJob: job });
}

export async function updateJob(req, res) {
   const { id } = req.params;

   const job = await Job.findByIdAndUpdate(id, req.body, { new: true });

   if (!job) {
      throw new NotFound(`no job with id ${id} found`);
   }

   res.status(StatusCodes.OK).json({ success: true, updatedJob: job });
}

export async function deleteJob(req, res) {
   const { id } = req.params;

   const job = await Job.findByIdAndDelete(id);

   if (!job) {
      throw new NotFound(`no job with id ${id} found`);
   }

   res.status(StatusCodes.OK).json({ success: true, deletedjob: job });
}
