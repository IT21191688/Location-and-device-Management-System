import { Router } from "express";
import userMiddleware from "../middlewares/user-middleware";
import commonMiddleware from "../config/storage-middleware";
import {
  CreateDevice,
  DeleteDevice,
  FindAllDevices,
  FindDeviceById,
  UpdateDevice,
} from "../controllers/device-controller";
import constants from "../utills/constants";

const DeviceRouter = Router();

DeviceRouter.post(
  "/createDevice",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  commonMiddleware.multerUploader.single("image"),
  CreateDevice
);

DeviceRouter.get(
  "/getAllDevices",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  FindAllDevices
);

DeviceRouter.put(
  "/updateDevice/:deviceId",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  //  commonMiddleware.multerUploader.single("image"),
  UpdateDevice
);

DeviceRouter.get(
  "/getOneDevice/:deviceId",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  FindDeviceById
);

DeviceRouter.delete(
  "/deleteDevice/:deviceId",
  userMiddleware.authorize([constants.USER.ROLES.USER]),
  DeleteDevice
);

export default DeviceRouter;
