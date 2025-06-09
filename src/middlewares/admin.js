import BadRequest from "../errors/bad-request.js";

function adminMiddleware(req, res, next) {
   const { isAdmin } = req.user;

   if (!isAdmin) {
      throw new BadRequest("You have no permission to access this route");
   }
   next();
}

export default adminMiddleware;