import { Router } from "express";
import userMiddleware from "../middlewares/user-middleware";
import {
  CreateLocation,
  DeleteLocation,
  FindAllLocations,
  FindLocationById,
  UpdateLocation,
} from "../controllers/location-controller";
import constants from "../utills/constants";

const LocationRouter = Router();

LocationRouter.post(
  "/createLocation",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  CreateLocation
);

LocationRouter.get(
  "/getAllLocations",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  FindAllLocations
);

LocationRouter.post(
  "/updateLocation/:locationId",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  UpdateLocation
);

LocationRouter.get(
  "/getOneLocation/:locationId",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  FindLocationById
);

LocationRouter.delete(
  "/deleteLocation/:locationId",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  DeleteLocation
);

export default LocationRouter;
