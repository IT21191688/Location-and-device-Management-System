"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteLocation = exports.UpdateLocation = exports.FindLocationById = exports.FindAllLocations = exports.CreateLocation = void 0;
const http_status_codes_1 = require("http-status-codes");
const location_service_1 = __importDefault(require("../services/location-service"));
const responce_1 = __importDefault(require("../utills/responce"));
const user_service_1 = __importDefault(require("../services/user-service"));
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
const CreateLocation = async (req, res) => {
    const body = req.body;
    const auth = req.auth;
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const createdLocation = await location_service_1.default.saveLocation(body, null);
        (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Location created successfully!", createdLocation);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error creating Location",
            error: error.message,
        });
    }
};
exports.CreateLocation = CreateLocation;
const FindAllLocations = async (req, res) => {
    const auth = req.auth;
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const allLocations = await location_service_1.default.findAllLocations();
        (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All locations retrieved successfully!", allLocations);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrived Location",
            error: error.message,
        });
    }
};
exports.FindAllLocations = FindAllLocations;
// Add other location controller functions here
const FindLocationById = async (req, res) => {
    const locationId = req.params.locationId;
    const auth = req.auth;
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const location = await location_service_1.default.findLocationById(locationId);
        if (!location) {
            (0, responce_1.default)(res, false, http_status_codes_1.StatusCodes.NOT_FOUND, "Location not found", null);
        }
        else {
            (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Location retrieved successfully", location);
        }
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error Retrived Location",
            error: error.message,
        });
    }
};
exports.FindLocationById = FindLocationById;
const UpdateLocation = async (req, res) => {
    const locationId = req.params.locationId;
    const updatedData = req.body;
    const auth = req.auth;
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const updatedLocation = await location_service_1.default.editLocationDetails(locationId, updatedData);
        if (!updatedLocation) {
            (0, responce_1.default)(res, false, http_status_codes_1.StatusCodes.NOT_FOUND, "Location not found", null);
        }
        else {
            (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Location updated successfully", updatedLocation);
        }
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error Update Location",
            error: error.message,
        });
    }
};
exports.UpdateLocation = UpdateLocation;
const DeleteLocation = async (req, res) => {
    const locationId = req.params.locationId;
    const auth = req.auth;
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const deletedLocation = await location_service_1.default.deleteLocationById(locationId);
        if (!deletedLocation) {
            (0, responce_1.default)(res, false, http_status_codes_1.StatusCodes.NOT_FOUND, "Location not found", null);
        }
        else {
            (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Location deleted successfully", null);
        }
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error Delete Location",
            error: error.message,
        });
    }
};
exports.DeleteLocation = DeleteLocation;
