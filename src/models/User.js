import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    // Student-specific
    matricNumber: { type: String, trim: true },
    level: { type: String, enum: ["100", "200", "300", "400", "500", ""], default: "" },
    // Teacher-specific
    position: { type: String, trim: true },
    // Shared profile fields
    phone: { type: String, trim: true, default: "" },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
