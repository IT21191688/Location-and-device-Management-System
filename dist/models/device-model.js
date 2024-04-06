"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const deviceSchema = new mongoose_1.default.Schema({
    serialnumber: {
        type: String,
        required: [true, "Serial number is required"],
        //unique: true,
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
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Location",
    },
}, {
    timestamps: true,
    versionKey: false,
});
// deviceSchema.pre("find", function () {
//   this.populate("location");
// });
exports.default = mongoose_1.default.model("Device", deviceSchema);
