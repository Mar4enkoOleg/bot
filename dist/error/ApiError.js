"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(s, m) {
        super();
        this.status = s;
        this.message = m;
    }
    static badRequest(message) {
        return new ApiError(404, message);
    }
    static internal(message) {
        return new ApiError(500, message);
    }
    static forbidden(message) {
        return new ApiError(403, message);
    }
}
exports.default = ApiError;