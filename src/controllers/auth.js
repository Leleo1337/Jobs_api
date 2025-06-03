import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import BadRequest from "../errors/bad-request.js";
import Unauthenticated from "../errors/unauthenticated.js";

export async function register(req, res) {
   // cria o usuario com oq recebeu do body
   const user = await User.create({ ...req.body });

   //cria o token
   const token = user.createToken();
   res.status(StatusCodes.CREATED).json({ success: true, user_created: { name: user.name }, token });
}

export async function login(req, res) {
   const { email, password } = req.body;

   // verifica se foi fornecido email ou senha
   if (!email || !password) {
      throw new BadRequest("Please provide email and password");
   }

   // procura o email recebido do body no banco de dados
   const user = await User.findOne({ email });

   if (!user) {
      throw new Unauthenticated("Invalid email or password");
   }

   // compara a senha do body com o hash do bcrypt
   const isPasswordCorrect = await user.comparePassword(password);

   // se não tiver correto da erro
   if (!isPasswordCorrect) {
      throw new Unauthenticated("invalid credentials");
   }

   // então cria um novo token
   const token = user.createToken();
   res.status(StatusCodes.OK).json({ success: true, user: { name: user.name }, token });
}
