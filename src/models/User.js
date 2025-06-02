import mongoose from "mongoose";

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

export default mongoose.model("User", UserSchema);
