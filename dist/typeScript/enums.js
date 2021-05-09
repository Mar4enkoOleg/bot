"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.Roles = exports.httpCode = void 0;
var httpCode;
(function (httpCode) {
    // Success
    // =======================
    httpCode[httpCode["OK"] = 200] = "OK";
    httpCode[httpCode["CREATED"] = 201] = "CREATED";
    httpCode[httpCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    // Error
    // =======================
    httpCode[httpCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    httpCode[httpCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    httpCode[httpCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    httpCode[httpCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    httpCode[httpCode["CONFLICT"] = 409] = "CONFLICT";
    // ServerError
    // =======================
    httpCode[httpCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
})(httpCode = exports.httpCode || (exports.httpCode = {}));
var Roles;
(function (Roles) {
    Roles["USER"] = "USER";
    Roles["ADMIN"] = "ADMIN";
    Roles["SUPERADMIN"] = "SUPERADMIN";
})(Roles = exports.Roles || (exports.Roles = {}));
var UserType;
(function (UserType) {
    UserType["STUDENT"] = "Student";
    UserType["ASPIRANT"] = "Aspirant";
    UserType["TEACHER"] = "Teacher";
})(UserType = exports.UserType || (exports.UserType = {}));
