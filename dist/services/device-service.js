"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_model_1 = __importDefault(require("../models/device-model"));
const saveDevice = async (deviceData, session) => {
    //console.log(deviceData);
    if (session) {
        return await deviceData.save({ session });
    }
    else {
        return await deviceData.save();
    }
};
const findAllDevices = () => {
    return device_model_1.default.find({});
};
const findDeviceById = (deviceId) => {
    return device_model_1.default.findById(deviceId);
};
const findDevicesByLocationId = (locationId) => {
    return device_model_1.default.find({ location: locationId });
};
const editDeviceDetails = async (deviceId, updatedDetails) => {
    try {
        //console.log(updatedDetails);
        const updatedDevice = await device_model_1.default.findByIdAndUpdate(deviceId, updatedDetails, { new: true });
        return updatedDevice;
    }
    catch (error) {
        console.error("Error updating device:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};
const deleteDeviceById = async (deviceId) => {
    return await device_model_1.default.findByIdAndDelete(deviceId);
};
exports.default = {
    saveDevice,
    findAllDevices,
    findDeviceById,
    editDeviceDetails,
    deleteDeviceById,
    findDevicesByLocationId,
};
