import { StatusCodes } from "http-status-codes"
import customApiError from "./custom-api.js"

class NotFound extends customApiError{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export default NotFound