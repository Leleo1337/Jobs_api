import mongoose from "mongoose";

export function connectDB(DATABASE_URL) {
   return mongoose
      .connect(DATABASE_URL)
      .then(() => console.log("connected to db"))
      .catch((e) => console.log(e));
}
