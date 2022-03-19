import mongoose from "mongoose"
const Schema = mongoose.Schema

export const CommentsSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
  creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
  body: { type: String, required: true, min: 5, max: 200 },
  isAttending: { type: Boolean, required: true, default: false }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentsSchema.virtual('creator', {
  localField: 'creatorId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})

CommentsSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event'
})