import NotFoundError from "../utills/error/error.classes/NotFoundError";
import User from "../models/user-model";

const save = async (user: any, session: any) => {
  if (session) {
    return await user.save({ session });
  } else {
    return await user.save();
  }
};

const findByEmail = async (email: string) => {
  return await User.findOne({ email: email });
};

const findById = async (id: string) => {
  return await User.findById(id);
};

const deleteById = async (id: string) => {
  const deletedUser = await User.findByIdAndDelete(id);
  return deletedUser;
};

const findAllUsers = async () => {
  return await User.find();
};

export default {
  save,
  findByEmail,
  findById,
  findAllUsers,
  deleteById,
};
