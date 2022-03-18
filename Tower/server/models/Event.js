import { isValidObjectId, Schema } from "mongoose";

export const EventsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  coverImg: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true, min: 1 },
  startDate: { type: Date, required: true },
  isCanceled: { type: Boolean, required: true, default: false },
  type: { type: String, enum: ['Concert', 'Convention', 'Sport', 'Digital'] },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true }
})