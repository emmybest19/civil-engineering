import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: String, required: true, trim: true },
    session: { type: String, trim: true }, // e.g. "2024/2025"
    semester: { type: String, enum: ["first", "second"], default: "first" },
    score: { type: Number, min: 0, max: 100 },
    grade: { type: String, trim: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Result || mongoose.model("Result", resultSchema);
