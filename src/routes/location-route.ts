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
  userMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  CreateLocation
);

LocationRouter.get(
  "/getAllLocations",
  userMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  FindAllLocations
);

LocationRouter.put(
  "/updateLocation/:locationId",
  userMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  UpdateLocation
);

LocationRouter.get(
  "/getOneLocation/:locationId",
  userMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  FindLocationById
);

LocationRouter.delete(
  "/deleteLocation/:locationId",
  userMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  DeleteLocation
);

export default LocationRouter;
