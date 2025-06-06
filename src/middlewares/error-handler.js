import { StatusCodes } from "http-status-codes";

function errorHandlerMiddleware(err, req, res, next) {
   const customError = {
   // set default
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message || "Something went wrong, try again later",
   };

   //     NÃO PRECISO MAIS USAR ISSO
   // if (err instanceof CustomApiError) {
   //    return res.status(err.statusCode).json({ msg: err.message });
   // }

   if (err.name == "ValidationError") {
      customError.statusCode = 400;
      customError.msg = Object.values(err.errors)
         .map((item) => item.message)
         .join(", ");
   }

   if (err.code === "") {
      customError.statusCode = 400;
      customError.msg = `Duplicate value entered for ${err.keyValue.id} field, please choose another value!`;
   }
   
   if (err.name === "CastError") {
      customError.statusCode = 404;
      customError.msg = `No item with id ${err.value} found`;
   }

   return res.status(customError.statusCode).json({ msg: customError.msg });
}

export default errorHandlerMiddleware;
