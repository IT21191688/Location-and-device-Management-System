"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = __importDefault(require("../middlewares/user-middleware"));
const storage_middleware_1 = __importDefault(require("../config/storage-middleware"));
const device_controller_1 = require("../controllers/device-controller");
const constants_1 = __importDefault(require("../utills/constants"));
const DeviceRouter = (0, express_1.Router)();
DeviceRouter.post("/createDevice", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.USER]), storage_middleware_1.default.multerUploader.single("image"), device_controller_1.CreateDevice);
DeviceRouter.get("/getAllDevices", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.USER]), device_controller_1.FindAllDevices);
DeviceRouter.put("/updateDevice/:deviceId", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.USER]), 
//  commonMiddleware.multerUploader.single("image"),
device_controller_1.UpdateDevice);
DeviceRouter.get("/getOneDevice/:deviceId", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.USER]), device_controller_1.FindDeviceById);
DeviceRouter.get("/getAllDeviceByLocation/:locationId", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.USER]), device_controller_1.FindAllDeviceByLocationId);
DeviceRouter.get("/getAllUnallocatedDevice", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.USER]), device_controller_1.FindAllDeviceByLocationId);
DeviceRouter.delete("/deleteDevice/:deviceId", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.USER]), device_controller_1.DeleteDevice);
exports.default = DeviceRouter;
