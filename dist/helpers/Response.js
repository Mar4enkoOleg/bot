"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../typeScript/enums");
class Res {
    static Success(res, data) {
        res.status(enums_1.httpCode.OK).json({
            data,
        });
    }
    static Created(res, data) {
        res.status(enums_1.httpCode.CREATED).json({
            data,
        });
    }
    static BadRequest(res, message = "Bad Requset") {
        res.status(enums_1.httpCode.BAD_REQUEST).json({
            message,
        });
    }
    static Unauthorized(res, message = "Unauthorized") {
        res.status(enums_1.httpCode.UNAUTHORIZED).json({
            message,
        });
    }
    static Forbidden(res) {
        res.status(enums_1.httpCode.FORBIDDEN).json({
            message: "Bad Requset",
        });
    }
    static Conflict(res, message) {
        res.status(enums_1.httpCode.CONFLICT).json({
            message,
        });
    }
    static InternalError(res, message = "Shit Happens") {
        res.status(enums_1.httpCode.CONFLICT).json({
            message,
        });
    }
}
exports.default = Res;
