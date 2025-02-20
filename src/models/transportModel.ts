import mongoose from "mongoose";

const TransportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gst: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Transport =
  mongoose.models.Transport ||
  mongoose.model("Transport", TransportSchema, "transports");
export default Transport;
