import mongoose from "mongoose"
const Schema = mongoose.Schema

export const TicketsSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, required: true, ref: 'Event' },
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' }
},
  { timestamps: true, toJSON: { virtuals: true } }
)

TicketsSchema.index({ eventId: 1, accountId: 1 }, { unique: true })

TicketsSchema.virtual('event', {
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  ref: 'Event'
})

TicketsSchema.virtual('account', {
  localField: 'accountId',
  foreignField: '_id',
  justOne: true,
  ref: 'Account'
})