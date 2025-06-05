import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Unauthenticated from "../errors/unauthenticated.js";

async function authenticationMiddleware(req, res, next) {
   // pega o "authorization" do header
   const authorization = req.headers.authorization;

   // verifica se existe o authorization e se o formato tá certo
   if (!authorization || !authorization.startsWith("Bearer ")) {
      throw new Unauthenticated("No token provided");
   }

   // remove o "Bearer" e pega só o token
   const token = authorization.split(" ")[1];
   try {
      // verifica se o token é valido
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(payload)
      //extrai dados do token
      const { userID, name, isAdmin } = payload;
      req.user = { userID, name, isAdmin };
      // Procura o usuario no banco de dados
      const user = await User.findById(userID);
      // Se não houver o usuario, então é porque o usuario foi deletado com o DELETE /users
      if (!user) throw new Unauthenticated("Invalid token");

      // passa para proxima rota
      next();
   } catch (error) {
      throw new Unauthenticated(error.message);
   }
}

export default authenticationMiddleware;
