import { Router } from "express";
import userMiddleware from "../middlewares/user-middleware";
import commonMiddleware from "../config/storage-middleware";
import {
  CreateDevice,
  DeleteDevice,
  FindAllDevices,
  FindDeviceById,
  UpdateDevice,
  FindAllDeviceByLocationId,
  FindUnallocatedDevices,
} from "../controllers/device-controller";
import constants from "../utills/constants";

const DeviceRouter = Router();

DeviceRouter.post(
  "/createDevice",
  userMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  commonMiddleware.multerUploader.single("image"),
  CreateDevice
);

DeviceRouter.get(
  "/getAllDevices",
  userMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  FindAllDevices
);

DeviceRouter.put(
  "/updateDevice/:deviceId",
  userMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  //  commonMiddleware.multerUploader.single("image"),
  UpdateDevice
);

DeviceRouter.get(
  "/getOneDevice/:deviceId",
  userMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  FindDeviceById
);

DeviceRouter.get(
  "/getAllDeviceByLocation/:locationId",
  userMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  FindAllDeviceByLocationId
);

DeviceRouter.get(
  "/getAllUnallocatedDevice",
  userMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  FindAllDeviceByLocationId
);

DeviceRouter.delete(
  "/deleteDevice/:deviceId",
  userMiddleware.authorize([constants.USER.ROLES.ADMIN]),
  DeleteDevice
);

export default DeviceRouter;
