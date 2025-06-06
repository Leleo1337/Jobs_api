import Job from "../models/Job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest, NotFound } from "../errors/index.js";

export async function getAllJobs(req, res) {
   const jobs = await Job.find({ createdBy: req.user.userID }).sort("createdAt");
   res.status(StatusCodes.OK).json({ success: true, count: jobs.length, jobs });
}

export async function getJob(req, res) {
   const {
      user: { userID },
      params: { id: jobID },
   } = req;

   const job = await Job.findOne({
      _id: jobID,
      createdBy: userID,
   });

   if (!job) {
      throw new NotFound(`no job with id ${jobID} found`);
   }

   res.status(StatusCodes.OK).json({ success: true, job });
}
export async function createJob(req, res) {
   req.body.createdBy = req.user.userID;

   const job = await Job.create(req.body);

   res.status(StatusCodes.CREATED).json({ success: true, createdJob: job });
}

export async function updateJob(req, res) {
   const {
      body: { company, position },
      user: { userID },
      params: { id: jobID },
   } = req;

   if (company === "" || position === "") {
      throw new BadRequest("company or position fields cannot be empty");
   }

   const job = await Job.findOneAndUpdate({ _id: jobID, createdBy: userID }, req.body, {
      new: true,
      runValidators: true,
   });

   if (!job) {
      throw new NotFound(`no job with id ${jobID} found`);
   }

   res.status(StatusCodes.OK).json({ success: true, updatedJob: job });
}

export async function deleteJob(req, res) {
   const {
      user: { userID },
      params: { id: jobID },
   } = req;

   const job = await Job.findOneAndDelete({ _id: jobID, createdBy: userID });

   if (!job) {
      throw new NotFound(`no job with id ${jobID} found`);
   }

   res.status(StatusCodes.OK).json({ success: true, deletedjob: job });
}
