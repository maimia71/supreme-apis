class CustomErrorHandler extends Error {

    constructor(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
    }

    static alreadyExist(message) {
        return new CustomErrorHandler(409, message);
    }

}

export default CustomErrorHandler;