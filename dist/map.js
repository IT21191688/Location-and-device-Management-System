"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __importDefault(require("./utills/constants"));
const user_route_1 = __importDefault(require("./routes/user-route"));
const device_route_1 = __importDefault(require("./routes/device-route"));
const location_route_1 = __importDefault(require("./routes/location-route"));
const requestMappings = (app) => {
    app.use(constants_1.default.API.PREFIX.concat("/user"), user_route_1.default);
    app.use(constants_1.default.API.PREFIX.concat("/device"), device_route_1.default);
    app.use(constants_1.default.API.PREFIX.concat("/location"), location_route_1.default);
};
exports.default = requestMappings;
