import mongoose from "mongoose";

const lecturerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    position: { type: String, trim: true },
    image: { type: String, default: "" },
    qualifications: { type: String, default: "" },
    specialization: { type: String, default: "" },
    bio: { type: String, default: "" },
    contact: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Lecturer || mongoose.model("Lecturer", lecturerSchema);
