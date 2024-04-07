"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_middleware_1 = __importDefault(require("../middlewares/user-middleware"));
const location_controller_1 = require("../controllers/location-controller");
const constants_1 = __importDefault(require("../utills/constants"));
const LocationRouter = (0, express_1.Router)();
LocationRouter.post("/createLocation", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.ADMIN]), location_controller_1.CreateLocation);
LocationRouter.get("/getAllLocations", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.ADMIN]), location_controller_1.FindAllLocations);
LocationRouter.put("/updateLocation/:locationId", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.ADMIN]), location_controller_1.UpdateLocation);
LocationRouter.get("/getOneLocation/:locationId", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.ADMIN]), location_controller_1.FindLocationById);
LocationRouter.delete("/deleteLocation/:locationId", user_middleware_1.default.authorize([constants_1.default.USER.ROLES.ADMIN]), location_controller_1.DeleteLocation);
exports.default = LocationRouter;
