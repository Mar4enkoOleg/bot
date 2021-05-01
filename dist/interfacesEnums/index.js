"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserType = exports.Roles = void 0;
var Roles;
(function (Roles) {
    Roles[Roles["USER"] = 1] = "USER";
    Roles[Roles["ADMIN"] = 2] = "ADMIN";
    Roles[Roles["SUPERADMIN"] = 3] = "SUPERADMIN";
})(Roles = exports.Roles || (exports.Roles = {}));
var UserType;
(function (UserType) {
    UserType["STUDENT"] = "Student";
    UserType["ASPIRANT"] = "Aspirant";
    UserType["TEACHER"] = "Teacher";
})(UserType = exports.UserType || (exports.UserType = {}));
