import mongoose from "mongoose"
const Schema = mongoose.Schema

export const CommentsSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, required: true },
  creatorId: { type: Schema.Types.ObjectId, required: true },
  body: { type: String, required: true, min: 5, max: 200 },
  isAttending: { type: Boolean, required: true, default: false }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentsSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Profile'
})

CommentsSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event'
})