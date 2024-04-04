import Device from "../models/device-model";

const saveDevice = async (deviceData: any, session: any) => {
  const device = new Device(deviceData);
  if (session) {
    return await device.save({ session });
  } else {
    return await device.save();
  }
};

const findAllDevices = () => {
  return Device.find({});
};

const findDeviceById = (deviceId: any) => {
  return Device.findById(deviceId);
};

const editDeviceDetails = async (deviceId: string, updatedDetails: any) => {
  return await Device.findByIdAndUpdate(deviceId, updatedDetails, {
    new: true,
  });
};

const deleteDeviceById = async (deviceId: string) => {
  return await Device.findByIdAndDelete(deviceId);
};

export default {
  saveDevice,
  findAllDevices,
  findDeviceById,
  editDeviceDetails,
  deleteDeviceById,
};
