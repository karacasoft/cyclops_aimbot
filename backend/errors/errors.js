class APIError extends Error {
    constructor(status, message, data) {
        super();

        this.status = status;
        this.message = message;
        this.data = data || {};
    }
}

class NotFoundError extends APIError {
    constructor() {
        super(404, "Not Found", {});
    }
}

class ParameterError extends APIError {
    constructor(requiredParams) {
        super(400, "Missing required parameters", {
            required: requiredParams
        });
    }
}

module.exports = {
    NotFoundError: NotFoundError,
    ParameterError: ParameterError
};