import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import deviceService from "../services/device-service";
import userService from "../services/user-service";
import NotFoundError from "../utills/error/error.classes/NotFoundError";
import CustomResponse from "../utills/responce";
import Device from "../models/device-model";
import constants from "../utills/constants";

import commonService from "../config/storage-config";

const CreateDevice = async (req: Request, res: Response) => {
  const body = req.body;
  const auth = req.auth;
  let file: any = req.file;

  // console.log(body);

  try {
    const user = await userService.findById(auth._id);
    if (!user) throw new NotFoundError("User not found!");

    const newDevice = new Device({
      serialnumber: body.serialnumber,
      type: body.type,
      image: body.image,
      status: body.status,
      location: body.location,
    });

    let uploadedObj: any = null;
    if (file) {
      uploadedObj = await commonService.uploadImageAndGetUri(
        file,
        constants.CLOUDINARY.FILE_NAME + "/devices"
      );
    }

    if (uploadedObj != null) {
      newDevice.image = uploadedObj.uri.toString();
    }

    const createdDevice = await deviceService.saveDevice(newDevice, null);

    CustomResponse(
      res,
      true,
      StatusCodes.CREATED,
      "Device created successfully!",
      createdDevice
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating device",
      error: error.message,
    });
  }
};

const FindAllDevices = async (req: Request, res: Response) => {
  const auth = req.auth;

  try {
    const user = await userService.findById(auth._id);
    if (!user) throw new NotFoundError("User not found!");

    const allDevices = await deviceService.findAllDevices();
    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "All devices retrieved successfully!",
      allDevices
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving devices",
      error: error.message,
    });
  }
};

// Add other device controller functions here

const FindDeviceById = async (req: Request, res: Response) => {
  const deviceId = req.params.deviceId;
  const auth = req.auth;

  try {
    const user = await userService.findById(auth._id);
    if (!user) throw new NotFoundError("User not found!");

    const device = await deviceService.findDeviceById(deviceId);
    if (!device) {
      CustomResponse(
        res,
        false,
        StatusCodes.NOT_FOUND,
        "Device not found",
        null
      );
    } else {
      CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Device retrieved successfully",
        device
      );
    }
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrieving device",
      error: error.message,
    });
  }
};

const UpdateDevice = async (req: Request, res: Response) => {
  const deviceId = req.params.deviceId;
  const updatedData = req.body;
  const auth = req.auth;

  try {
    const user = await userService.findById(auth._id);
    if (!user) throw new NotFoundError("User not found!");

    const updatedDevice = await deviceService.editDeviceDetails(
      deviceId,
      updatedData
    );
    if (!updatedDevice) {
      CustomResponse(
        res,
        false,
        StatusCodes.NOT_FOUND,
        "Device not found",
        null
      );
    } else {
      CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Device updated successfully",
        updatedDevice
      );
    }
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error updating device",
      error: error.message,
    });
  }
};

const DeleteDevice = async (req: Request, res: Response) => {
  const deviceId = req.params.deviceId;
  const auth = req.auth;

  try {
    const user = await userService.findById(auth._id);
    if (!user) throw new NotFoundError("User not found!");

    const deletedDevice = await deviceService.deleteDeviceById(deviceId);
    if (!deletedDevice) {
      CustomResponse(
        res,
        false,
        StatusCodes.NOT_FOUND,
        "Device not found",
        null
      );
    } else {
      CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Device deleted successfully",
        null
      );
    }
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error deleting device",
      error: error.message,
    });
  }
};

export {
  CreateDevice,
  FindAllDevices,
  FindDeviceById,
  UpdateDevice,
  DeleteDevice,
};
