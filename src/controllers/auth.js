import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

export async function register(req, res) {
   const user = await User.create({...req.body});
   res.status(StatusCodes.CREATED).json({ user });
}

export async function login(req, res) {
   res.send("login user");
}