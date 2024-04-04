import constants from "./utills/constants";
import UserRouter from "./routes/user-route";
import DeviceRouter from "./routes/device-route";
import LocationRouter from "./routes/location-route";

const requestMappings = (app: any) => {
  app.use(constants.API.PREFIX.concat("/user"), UserRouter);
  app.use(constants.API.PREFIX.concat("/device"), DeviceRouter);
  app.use(constants.API.PREFIX.concat("/location"), LocationRouter);
};

export default requestMappings;
