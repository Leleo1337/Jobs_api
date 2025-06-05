import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// schema do mongodb
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
   isAdmin: {
      type: Boolean,
      default: false
   }
});

// o pre("save") é um middleware que serve para executar uma função antes que algo seja salvo no banco de dados )
// aqui estou usando para criptografar a senha antes que seja salva do no banco de dados
UserSchema.pre("save", async function () {
   const salt = await bcrypt.genSalt(10);
   this.password = await bcrypt.hash(this.password, salt);
});

// basicamente eu crio uma função dentro do meu schema, e eu posso chamar ela quando eu quiser manipular algum dado
// essa função serve para criar o token do jwt
UserSchema.methods.createToken = function () {
   return jwt.sign({ userID: this._id, name: this.name, isAdmin: this.isAdmin }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};

// essa função serve para comparar as senhas, ela recebe a senha do body como parametro e é comparada com a senha criptografada, e retorna se deu "match"
UserSchema.methods.comparePassword = async function(bodyPassword){
   const match = await bcrypt.compare(bodyPassword, this.password)
   return match
}

export default mongoose.model("User", UserSchema);
