import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: String,
      required: [true, "Serial number is required"],
      unique: true,
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ["pos", "kiosk", "signage"],
    },
    image: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Device", deviceSchema);
