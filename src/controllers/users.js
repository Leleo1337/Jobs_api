import { StatusCodes } from "http-status-codes";
import BadRequest from "../errors/bad-request.js";
import NotFound from "../errors/not-found.js";
import User from "../models/User.js";

export async function getAllUsers(req, res) {
   const users = await User.find();

   if (!users) {
      return res.json({ success: true, msg: "empty database" });
   }

   res.status(StatusCodes.OK).json({ success: true, count: users.length, users });
}

export async function getUser(req, res) {
   const { id } = req.params;

   try {
      const user = await User.findById(id);
      if (!user) throw new NotFound(`no user with id ${id} found`);

      res.status(StatusCodes.OK).json({ success: true, user });
   } catch (error) {
      throw new BadRequest(error.message);
   }
}

export async function updateUser(req, res) {
   const { id: userID } = req.params;
   const { name, email, password, isAdmin } = req.body;

   try {
      const user = await User.findById(userID);

      if (!user) throw new NotFound(`No user with id ${userID} found`);

      if (name) user.name = name;
      if (email) user.email = email;
      if (password) user.password = password;
      if (isAdmin) user.isAdmin = isAdmin;

      await user.save();

      res.status(StatusCodes.OK).json({ success: true, user });
   } catch (error) {
      throw new BadRequest(error.message);
   }
}

export async function deleteUser(req, res) {
   const { id: userID } = req.params;

   try {
      const user = await User.findByIdAndDelete(userID);
      if (!user) throw new NotFound(`No user with id ${userID} found`);

      res.status(StatusCodes.OK).json({
         success: true,
         deletedUser: { id: user._id, name: user.name, email: user.email },
      });
   } catch (error) {
      throw new BadRequest(error.message);
   }
}
