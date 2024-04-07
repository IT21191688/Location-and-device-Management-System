import { Router } from "express";
import UserMiddleware from "../middlewares/user-middleware";

import {
  RegisterUser,
  GetUserProfile,
  UserLogin,
  GetAllUsers,
  DeleteUserById,
} from "../controllers/user-controller";
import constants from "../utills/constants";

const UserRouter = Router();

UserRouter.post("/register", RegisterUser);

UserRouter.post("/login", UserLogin);

UserRouter.get(
  "/profile",
  UserMiddleware.authorize([
    constants.USER.ROLES.ADMIN,
    constants.USER.ROLES.USER,
  ]),
  GetUserProfile
);

UserRouter.get(
  "/getAllUsers",
  UserMiddleware.authorize([constants.USER.ROLES.USER]),
  GetAllUsers
);

UserRouter.delete(
  "/deleteUser/:userId",
  UserMiddleware.authorize([constants.USER.ROLES.USER]),
  DeleteUserById
);

export default UserRouter;
