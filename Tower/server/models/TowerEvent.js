import mongoose from "mongoose"
const Schema = mongoose.Schema

export const EventsSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  coverImg: { type: String, required: false, default: 'https://source.unsplash.com/700x700/?digital' },
  location: { type: String, required: true },
  capacity: { type: Number, required: false, min: 0 },
  /**@ts-ignore */
  startDate: { type: Date, required: true, min: new Date().toISOString().split('T')[0] },
  isCanceled: { type: Boolean, required: false, default: false },
  type: { type: String, enum: ['CONCERT', 'CONVENTION', 'SPORT', 'DIGITAL'], uppercase: true, default: 'CONVENTION' },
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }

},
  { timestamps: true, toJSON: { virtuals: true } }
)

EventsSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

