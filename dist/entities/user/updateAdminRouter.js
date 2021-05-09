"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const updateAdmin_controller_1 = require("./updateAdmin.controller");
const router = express_1.Router();
router.get('/getAdmins', updateAdmin_controller_1.getAllAdmins);
router.put('/changeAdminToUser/:username', updateAdmin_controller_1.changeAdminToUser);
router.put('/addAdmin/:username', updateAdmin_controller_1.changeUserToAdmin);
exports.default = router;
