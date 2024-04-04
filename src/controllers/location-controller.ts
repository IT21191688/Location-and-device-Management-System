import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import locationService from "../services/location-service";
import CustomResponse from "../utills/responce";
import userService from "../services/user-service";
import NotFoundError from "../utills/error/error.classes/NotFoundError";

const CreateLocation = async (req: Request, res: Response) => {
  const body = req.body;
  const auth = req.auth;

  try {
    const user = await userService.findById(auth._id);
    if (!user) throw new NotFoundError("User not found!");

    const createdLocation = await locationService.saveLocation(body, null);

    CustomResponse(
      res,
      true,
      StatusCodes.CREATED,
      "Location created successfully!",
      createdLocation
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error creating Location",
      error: error.message,
    });
  }
};

const FindAllLocations = async (req: Request, res: Response) => {
  const auth = req.auth;

  try {
    const user = await userService.findById(auth._id);
    if (!user) throw new NotFoundError("User not found!");

    const allLocations = await locationService.findAllLocations();
    CustomResponse(
      res,
      true,
      StatusCodes.OK,
      "All locations retrieved successfully!",
      allLocations
    );
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error retrived Location",
      error: error.message,
    });
  }
};

// Add other location controller functions here

const FindLocationById = async (req: Request, res: Response) => {
  const locationId = req.params.locationId;
  const auth = req.auth;

  try {
    const user = await userService.findById(auth._id);
    if (!user) throw new NotFoundError("User not found!");

    const location = await locationService.findLocationById(locationId);
    if (!location) {
      CustomResponse(
        res,
        false,
        StatusCodes.NOT_FOUND,
        "Location not found",
        null
      );
    } else {
      CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Location retrieved successfully",
        location
      );
    }
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error Retrived Location",
      error: error.message,
    });
  }
};

const UpdateLocation = async (req: Request, res: Response) => {
  const locationId = req.params.locationId;
  const updatedData = req.body;
  const auth = req.auth;

  try {
    const user = await userService.findById(auth._id);
    if (!user) throw new NotFoundError("User not found!");

    const updatedLocation = await locationService.editLocationDetails(
      locationId,
      updatedData
    );
    if (!updatedLocation) {
      CustomResponse(
        res,
        false,
        StatusCodes.NOT_FOUND,
        "Location not found",
        null
      );
    } else {
      CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Location updated successfully",
        updatedLocation
      );
    }
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error Update Location",
      error: error.message,
    });
  }
};

const DeleteLocation = async (req: Request, res: Response) => {
  const locationId = req.params.locationId;
  const auth = req.auth;

  try {
    const user = await userService.findById(auth._id);
    if (!user) throw new NotFoundError("User not found!");

    const deletedLocation = await locationService.deleteLocationById(
      locationId
    );
    if (!deletedLocation) {
      CustomResponse(
        res,
        false,
        StatusCodes.NOT_FOUND,
        "Location not found",
        null
      );
    } else {
      CustomResponse(
        res,
        true,
        StatusCodes.OK,
        "Location deleted successfully",
        null
      );
    }
  } catch (error: any) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Error Delete Location",
      error: error.message,
    });
  }
};

export {
  CreateLocation,
  FindAllLocations,
  FindLocationById,
  UpdateLocation,
  DeleteLocation,
};
