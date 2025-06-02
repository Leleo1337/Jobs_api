import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, "Please provide a name"],
      minLength: 3,
      maxLength: 15,
   },
   email: {
      type: String,
      required: [true, "Please provide a E-mail"],
      match: [
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         "Please provide a valid E-mail",
      ],
      unique: true,
   },
   password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: 6,
   },
});

UserSchema.pre("save", async function (next) {
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
   next();
});

export default mongoose.model("User", UserSchema);
