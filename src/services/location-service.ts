import Location from "../models/location-model";

const saveLocation = async (locationData: any, session: any) => {
  const location = new Location(locationData);
  if (session) {
    return await location.save({ session });
  } else {
    return await location.save();
  }
};

const findAllLocations = () => {
  return Location.find({});
};

const findLocationById = (locationId: any) => {
  return Location.findById(locationId);
};

const editLocationDetails = async (locationId: string, updatedDetails: any) => {
  return await Location.findByIdAndUpdate(locationId, updatedDetails, {
    new: true,
  });
};

const deleteLocationById = async (locationId: string) => {
  return await Location.findByIdAndDelete(locationId);
};

export default {
  saveLocation,
  findAllLocations,
  findLocationById,
  editLocationDetails,
  deleteLocationById,
};
