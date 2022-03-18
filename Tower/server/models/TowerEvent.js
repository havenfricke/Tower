import mongoose from "mongoose"
const Schema = mongoose.Schema

export const EventsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  coverImg: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true, min: 1 },
  startDate: { type: Date, required: true, min: Date.now() },
  isCanceled: { type: Boolean, required: true, default: false },
  type: { type: String, enum: ['CONCERT', 'CONVENTION', 'SPORT', 'DIGITAL'], uppercase: true, default: 'CONVENTION' },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
},
  { timestamps: true, toJSON: { virtuals: true } }
)

EventsSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})

