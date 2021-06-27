import { DEBUG_MODE } from "../config";

import { ValidationError } from "joi";
import CustomErrorHandler from "../services/customErrorHandler";

// middleware takes four params
const errorHandler = (error, req, res, next) => {

    let statusCode = 500;

    let data = {
        message: 'Internal server error',
        ...(DEBUG_MODE === 'true' && { originalError: error.message })
    }

    if (error instanceof ValidationError) {

        statusCode = 422;

        data = {
            message: error.message
        }

    }

    if (error instanceof CustomErrorHandler) {
        statusCode = 409;

        data = {
            message: error.message
        }
    }

    return res.status(statusCode).json(data);

}

export default errorHandler;