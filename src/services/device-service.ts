import Device from "../models/device-model";

const saveDevice = async (deviceData: any, session: any) => {
  //console.log(deviceData);
  if (session) {
    return await deviceData.save({ session });
  } else {
    return await deviceData.save();
  }
};

const findAllDevices = () => {
  return Device.find({});
};

const findDeviceById = (deviceId: any) => {
  return Device.findById(deviceId);
};

const findUnallocatedDevices = () => {
  return Device.find({ location: { $exists: false } });
};

const findDevicesByLocationId = (locationId: any) => {
  return Device.find({ location: locationId });
};

const editDeviceDetails = async (deviceId: string, updatedDetails: any) => {
  try {
    //console.log(updatedDetails);
    const updatedDevice = await Device.findByIdAndUpdate(
      deviceId,
      updatedDetails,
      { new: true }
    );
    return updatedDevice;
  } catch (error) {
    console.error("Error updating device:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
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
  findDevicesByLocationId,
  findUnallocatedDevices,
};
