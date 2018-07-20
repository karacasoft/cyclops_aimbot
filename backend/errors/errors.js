class APIError extends Error {
    constructor(status, message, data) {
        super();

        this.status = status;
        this.message = message;
        this.data = data;
    }
}

class NotFoundError extends APIError {
    constructor(message, route) {
        data = {};
        if(route !== undefined) data.route = route;
        super(404, message, data);
    }
}

module.exports = {
    NotFoundError: NotFoundError
};