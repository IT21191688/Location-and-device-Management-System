"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindUnallocatedDevices = exports.FindAllDeviceByLocationId = exports.DeleteDevice = exports.UpdateDevice = exports.FindDeviceById = exports.FindAllDevices = exports.CreateDevice = void 0;
const http_status_codes_1 = require("http-status-codes");
const device_service_1 = __importDefault(require("../services/device-service"));
const user_service_1 = __importDefault(require("../services/user-service"));
const NotFoundError_1 = __importDefault(require("../utills/error/error.classes/NotFoundError"));
const responce_1 = __importDefault(require("../utills/responce"));
const device_model_1 = __importDefault(require("../models/device-model"));
const constants_1 = __importDefault(require("../utills/constants"));
const storage_config_1 = __importDefault(require("../config/storage-config"));
const CreateDevice = async (req, res) => {
    const body = req.body;
    const auth = req.auth;
    let file = req.file;
    // console.log(body);
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const newDevice = new device_model_1.default({
            serialnumber: body.serialnumber,
            type: body.type,
            image: body.image,
            status: body.status,
            location: body.location,
        });
        let uploadedObj = null;
        if (file) {
            uploadedObj = await storage_config_1.default.uploadImageAndGetUri(file, constants_1.default.CLOUDINARY.FILE_NAME + "/devices");
        }
        if (uploadedObj != null) {
            newDevice.image = uploadedObj.uri.toString();
        }
        const createdDevice = await device_service_1.default.saveDevice(newDevice, null);
        (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.CREATED, "Device created successfully!", createdDevice);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error creating device",
            error: error.message,
        });
    }
};
exports.CreateDevice = CreateDevice;
const FindAllDevices = async (req, res) => {
    const auth = req.auth;
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const allDevices = await device_service_1.default.findAllDevices();
        (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All devices retrieved successfully!", allDevices);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving devices",
            error: error.message,
        });
    }
};
exports.FindAllDevices = FindAllDevices;
const FindUnallocatedDevices = async (req, res) => {
    const auth = req.auth;
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const allDevices = await device_service_1.default.findUnallocatedDevices();
        (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "All Unallocated devices retrieved successfully!", allDevices);
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving devices",
            error: error.message,
        });
    }
};
exports.FindUnallocatedDevices = FindUnallocatedDevices;
// Add other device controller functions here
const FindDeviceById = async (req, res) => {
    const deviceId = req.params.deviceId;
    const auth = req.auth;
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const device = await device_service_1.default.findDeviceById(deviceId);
        if (!device) {
            (0, responce_1.default)(res, false, http_status_codes_1.StatusCodes.NOT_FOUND, "Device not found", null);
        }
        else {
            (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Device retrieved successfully", device);
        }
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving device",
            error: error.message,
        });
    }
};
exports.FindDeviceById = FindDeviceById;
const FindAllDeviceByLocationId = async (req, res) => {
    const locationId = req.params.locationId;
    const auth = req.auth;
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const device = await device_service_1.default.findDevicesByLocationId(locationId);
        if (!device) {
            (0, responce_1.default)(res, false, http_status_codes_1.StatusCodes.NOT_FOUND, "Device not found", null);
        }
        else {
            (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Device retrieved successfully", device);
        }
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error retrieving device",
            error: error.message,
        });
    }
};
exports.FindAllDeviceByLocationId = FindAllDeviceByLocationId;
const UpdateDevice = async (req, res) => {
    const deviceId = req.params.deviceId;
    const updatedData = req.body;
    const auth = req.auth;
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const updatedDevice = await device_service_1.default.editDeviceDetails(deviceId, updatedData);
        if (!updatedDevice) {
            (0, responce_1.default)(res, false, http_status_codes_1.StatusCodes.NOT_FOUND, "Device not found", null);
        }
        else {
            (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Device updated successfully", updatedDevice);
        }
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error updating device",
            error: error.message,
        });
    }
};
exports.UpdateDevice = UpdateDevice;
const DeleteDevice = async (req, res) => {
    const deviceId = req.params.deviceId;
    const auth = req.auth;
    try {
        const user = await user_service_1.default.findById(auth._id);
        if (!user)
            throw new NotFoundError_1.default("User not found!");
        const deletedDevice = await device_service_1.default.deleteDeviceById(deviceId);
        if (!deletedDevice) {
            (0, responce_1.default)(res, false, http_status_codes_1.StatusCodes.NOT_FOUND, "Device not found", null);
        }
        else {
            (0, responce_1.default)(res, true, http_status_codes_1.StatusCodes.OK, "Device deleted successfully", null);
        }
    }
    catch (error) {
        console.error(error);
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Error deleting device",
            error: error.message,
        });
    }
};
exports.DeleteDevice = DeleteDevice;
