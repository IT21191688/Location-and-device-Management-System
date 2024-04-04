"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const device_model_1 = __importDefault(require("../models/device-model"));
const saveDevice = async (deviceData, session) => {
    const device = new device_model_1.default(deviceData);
    if (session) {
        return await device.save({ session });
    }
    else {
        return await device.save();
    }
};
const findAllDevices = () => {
    return device_model_1.default.find({});
};
const findDeviceById = (deviceId) => {
    return device_model_1.default.findById(deviceId);
};
const editDeviceDetails = async (deviceId, updatedDetails) => {
    return await device_model_1.default.findByIdAndUpdate(deviceId, updatedDetails, {
        new: true,
    });
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
};
