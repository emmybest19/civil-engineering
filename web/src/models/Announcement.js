import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    audience: {
      type: String,
      enum: ["all", "student", "teacher"],
      default: "all",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Announcement ||
  mongoose.model("Announcement", announcementSchema);
