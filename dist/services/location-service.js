"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const location_model_1 = __importDefault(require("../models/location-model"));
const saveLocation = async (locationData, session) => {
    const location = new location_model_1.default(locationData);
    if (session) {
        return await location.save({ session });
    }
    else {
        return await location.save();
    }
};
const findAllLocations = () => {
    return location_model_1.default.find({});
};
const findLocationById = (locationId) => {
    return location_model_1.default.findById(locationId);
};
const editLocationDetails = async (locationId, updatedDetails) => {
    return await location_model_1.default.findByIdAndUpdate(locationId, updatedDetails, {
        new: true,
    });
};
const deleteLocationById = async (locationId) => {
    return await location_model_1.default.findByIdAndDelete(locationId);
};
exports.default = {
    saveLocation,
    findAllLocations,
    findLocationById,
    editLocationDetails,
    deleteLocationById,
};
